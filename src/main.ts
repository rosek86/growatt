import * as fs from 'fs';
import ModbusRTU from 'modbus-serial';

import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';

import { Growatt } from './Growatt';
import { Raspi } from './Raspi';

import { GrowattSample } from './db/GrowattSample';
import { SysMetrics } from './db/SysMetrics';

interface Config {
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }
}

const client = new ModbusRTU();

client.setID(1);
client.setTimeout(1000);

client.connectRTUBuffered(`/dev/ttyUSB0`, { baudRate: 9600 }, async () => {
  let connection: Connection|null = null;

  try {
    const date = new Date();

    const config: Config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

    connection = await createConnection({
      type:     'mysql',
      host:     config.db.host,
      port:     config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.database,
      entities: [
        GrowattSample,
        SysMetrics
      ],
      synchronize: true,
      logging: true
    });

    const growatt = new Growatt(client);
    const regs = await growatt.readInputRegisters();

    const sample = new GrowattSample();
    sample.date           = date;
    sample.status         = regs.status;
    sample.pvVoltage      = regs.pv1InputVoltage;
    sample.pvCurrent      = regs.pv1InputCurrent;
    sample.pvPower        = regs.pv1InputPower;
    sample.outputPower    = regs.outputPower;
    sample.gridFrequency  = regs.gridFrequency;
    sample.energyToday    = regs.energyToday;
    sample.energyTotal    = regs.energyTotal;
    sample.timeTotal      = regs.timeTotal;
    sample.temperature    = regs.temperature;

    const growattSampleRepository = connection.getRepository(GrowattSample);
    await growattSampleRepository.save(sample);

    console.log(`Sample has been saved`);
    console.log(`Latest sample:`, await growattSampleRepository.findOne({
      order: { id: 'DESC' },
    }));

    const sysMetrics = new SysMetrics();
    sysMetrics.date = date;
    sysMetrics.temperature = await Raspi.getTemperature();
    const sysMetricsRepository = connection.getRepository(SysMetrics);
    await sysMetricsRepository.save(sysMetrics);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      await connection.close();
    }
    client.close(() => {
      console.log('serial port closed');
    });
  }
});