import ModbusRTU from "modbus-serial";

interface GrowattWord {
  word: 'H'|'L'|'S';
  name?: string;
  description?: string;
  unit?: string;
  map?: (v: number) => number|string;
}

export interface GrowattInputRegisters {
  status: string;
  pvInputPower: number;
  pv1InputVoltage: number;
  pv1InputCurrent: number;
  pv1InputPower: number;
  pv2InputVoltage: number;
  pv2InputCurrent: number;
  pv2InputPower: number;
  outputPower: number;
  gridFrequency: number;
  gridPhase1Voltage: number;
  gridPhase1Current: number;
  gridPhase1Power: number;
  gridPhase2Voltage: number;
  gridPhase2Current: number;
  gridPhase2Power: number;
  gridPhase3Voltage: number;
  gridPhase3Current: number;
  gridPhase3Power: number;
  energyToday: number;
  energyTotal: number;
  timeTotal: number;
  temperature: number;
  faultValueISO: number;
  faultValueGFCI: number;
  faultValueDCI: number;
  faultValuePvVoltage: number;
  faultValueAcVoltage: number;
  faultValueAcFrequency: number;
  faultValueTemperature: number;
  faultCode: number;
  ipmTemperature: number;
  pBusVoltage: number;
  nBusVoltage: number;
  checkStep: number;
  pfOutput: number;
  deratingMode: number;
  pv1EnergyToday: number;
  pv1EnergyTotal: number;
  pv2EnergyToday: number;
  pv2EnergyTotal: number;
  pvEnergyTotal: number;
  acReactivePower: number;
  acReactiveEnergyToday: number;
  acReactiveEnergyTotal: number;
  warningCode: number;
  warningValue: number;
}

export const GrowattInputRegistersDefinition: GrowattWord[] = [
  {
    word: 'S',
    name: 'status',
    description: 'Status',
    map: (v: number) => {
      const statusList = [ 'waiting', 'normal', undefined, 'fault' ];
      const status = statusList[v];
      return status || 'unknown';
    },
  },
  { word: 'H' },
  { word: 'L', description: 'PV input power',               name: 'pvInputPower',           unit: 'W',      map: (v: number) => v / 10 },
  { word: 'S', description: 'PV1 voltage',                  name: 'pv1InputVoltage',        unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'PV1 current',                  name: 'pv1InputCurrent',        unit: 'A',      map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'PV1 input power',              name: 'pv1InputPower',          unit: 'W',      map: (v: number) => v / 10 },
  { word: 'S', description: 'PV2 voltage',                  name: 'pv2InputVoltage',        unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'PV2 current',                  name: 'pv2InputCurrent',        unit: 'A',      map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'PV2 input power',              name: 'pv2InputPower',          unit: 'W',      map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'Output power',                 name: 'outputPower',            unit: 'W',      map: (v: number) => v / 10 },
  { word: 'S', description: 'Grid frequency',               name: 'gridFrequency',          unit: 'Hz',     map: (v: number) => v / 100 },
  { word: 'S', description: 'Grid phase 1 output voltage',  name: 'gridPhase1Voltage',      unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'Grid phase 1 output current',  name: 'gridPhase1Current',      unit: 'A',      map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'grid phase 1 output power',    name: 'gridPhase1Power',        unit: 'W',      map: (v: number) => v / 10 },
  { word: 'S', description: 'grid phase 2 output voltage',  name: 'gridPhase2Voltage',      unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'grid phase 2 output current',  name: 'gridPhase2Current',      unit: 'A',      map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'Grid phase 2 output power',    name: 'gridPhase2Power',        unit: 'W',      map: (v: number) => v / 10 },
  { word: 'S', description: 'Grid phase 3 output voltage',  name: 'gridPhase3Voltage',      unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'Grid phase 3 output current',  name: 'gridPhase3Current',      unit: 'A',      map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'Grid phase 3 output power',    name: 'gridPhase3Power',        unit: 'W',      map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'Energy today',                 name: 'energyToday',            unit: 'kWh',    map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'Energy total',                 name: 'energyTotal',            unit: 'kWh',    map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'Time total',                   name: 'timeTotal',              unit: 's',      map: (v: number) => v / 2 },
  { word: 'S', description: 'Temperature',                  name: 'temperature',            unit: '°C',     map: (v: number) => v / 10 },
  { word: 'S', description: 'ISO fault value',              name: 'faultValueISO',          unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'GFCI fault value',             name: 'faultValueGFCI',         unit: 'mA' },
  { word: 'S', description: 'DCI fault value',              name: 'faultValueDCI',          unit: 'A',      map: (v: number) => v / 100 },
  { word: 'S', description: 'PV voltage fault value',       name: 'faultValuePvVoltage',    unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'AC voltage fault value',       name: 'faultValueAcVoltage',    unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'AC frequency fault value',     name: 'faultValueAcFrequency',  unit: 'V',      map: (v: number) => v / 100 },
  { word: 'S', description: 'Temperature fault value',      name: 'faultValueTemperature',  unit: '°C',     map: (v: number) => v / 10 },
  { word: 'S', description: 'Fault code',                   name: 'faultCode' },
  { word: 'S', description: 'IPM temperature',              name: 'ipmTemperature',         unit: '°C',     map: (v: number) => v / 10 },
  { word: 'S', description: 'P bus voltage',                name: 'pBusVoltage',            unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'N bus voltage',                name: 'nBusVoltage',            unit: 'V',      map: (v: number) => v / 10 },
  { word: 'S', description: 'Check step',                   name: 'checkStep' },
  { word: 'S', description: 'Inverter output PF now',       name: 'pfOutput' },
  { word: 'S', description: 'Reset check data' },
  { word: 'S', description: 'Derating mode',                name: 'deratingMode' },
  { word: 'H' },
  { word: 'L', description: 'PV1 Energy today',             name: 'pv1EnergyToday',         unit: 'kWh',    map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'PV1 Energy total',             name: 'pv1EnergyTotal',         unit: 'kWh',    map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'PV2 Energy today',             name: 'pv2EnergyToday',         unit: 'kWh',    map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'PV2 Energy total',             name: 'pv2EnergyTotal',         unit: 'kWh',    map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'PV Energy total',              name: 'pvEnergyTotal',          unit: 'kWh',    map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'AC Reactive power',            name: 'acReactivePower',        unit: 'Var',    map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'AC Reactive energy today',     name: 'acReactiveEnergyToday',  unit: 'kVarh',  map: (v: number) => v / 10 },
  { word: 'H' },
  { word: 'L', description: 'AC Reactive energy total',     name: 'acReactiveEnergyTotal',  unit: 'kVarh',  map: (v: number) => v / 10 },
  { word: 'S', description: 'Warning Code',                 name: 'warningCode' },
  { word: 'S', description: 'Warning Value',                name: 'warningValue' },
];

export class Growatt {
  public constructor(private client: ModbusRTU) {}

  public async readInputRegisters(): Promise<GrowattInputRegisters> {
    const values: (number|undefined)[] = [];

    for (let i = 0; i < GrowattInputRegistersDefinition.length; i++) {
      try {
        const reg = await this.client.readInputRegisters(i, 1);
        values.push(reg.data[0]);
      } catch (err) {
        values.push(undefined);
      }
    }

    let highWord = 0;
    let entries: {[id:string]: number|string} = {};

    for (const [i, v] of values.entries()) {
      const d = GrowattInputRegistersDefinition[i];

      if (!d || !v) {
        continue;
      }

      if (d.word === 'H') {
        highWord = v;
        continue;
      }

      if (!d.name) {
        continue;
      }

      let value: number|string = v;
      let unit: string|undefined;

      if (d.word === 'L') {
        value += highWord * 2**16;
      }

      if (d.map) {
        value = d.map(value);
      }

      if (d.unit) {
        unit = d.unit;
      }

      entries[d.name] = value;
    }

    const regs = entries as any as GrowattInputRegisters;

    if (!regs.status) {
      throw new Error(`Cannot load registers`);
    }

    return regs;
  }
}
