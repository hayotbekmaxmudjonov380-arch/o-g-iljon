export const WATER_SPECIFIC_HEAT = 4200;

export const MOLECULE_SIZE_OIL_VOLUME_MM3 = 0.004;
export const MOLECULE_SIZE_TARGET_FILM_DIAMETER_CM = 5.0;
export const MOLECULE_SIZE_FILM_TOLERANCE_CM = 0.5;
export const MOLECULE_SIZE_TARGET_DIAMETER_NM = 2.0;
export const MOLECULE_SIZE_DIAMETER_TOLERANCE_NM = 0.35;

export const HEAT_EQUILIBRIUM_TOLERANCE_C = 1.5;

export interface MoleculeSizeResult {
  areaCm2: number;
  areaM2: number;
  volumeM3: number;
  diameterM: number;
  diameterNm: number;
}

export interface HeatEquilibriumInput {
  hotMassG: number;
  hotTempC: number;
  coldMassG: number;
  coldTempC: number;
}

export interface HeatEquilibriumResult {
  totalMassG: number;
  equilibriumTempC: number;
  hotDeltaC: number;
  coldDeltaC: number;
  heatGivenJ: number;
  heatTakenJ: number;
}

export function parseNumericInput(raw: string): number | null {
  if (typeof raw !== 'string') return null;
  const normalized = raw.replace(',', '.').trim();
  if (!normalized) return null;
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : null;
}

export function isWithinTolerance(
  value: number,
  target: number,
  tolerance: number
): boolean {
  return Math.abs(value - target) <= tolerance;
}

export function estimateMoleculeSize(
  oilVolumeMm3: number,
  filmDiameterCm: number
): MoleculeSizeResult {
  if (
    !Number.isFinite(oilVolumeMm3) ||
    !Number.isFinite(filmDiameterCm) ||
    oilVolumeMm3 <= 0 ||
    filmDiameterCm <= 0
  ) {
    return {
      areaCm2: 0,
      areaM2: 0,
      volumeM3: 0,
      diameterM: 0,
      diameterNm: 0,
    };
  }

  const radiusCm = filmDiameterCm / 2;
  const areaCm2 = Math.PI * radiusCm * radiusCm;
  const areaM2 = areaCm2 * 1e-4;
  const volumeM3 = oilVolumeMm3 * 1e-9;
  const diameterM = volumeM3 / areaM2;

  return {
    areaCm2,
    areaM2,
    volumeM3,
    diameterM,
    diameterNm: diameterM * 1e9,
  };
}

export function computeHeatEquilibrium(
  input: HeatEquilibriumInput
): HeatEquilibriumResult {
  const { hotMassG, hotTempC, coldMassG, coldTempC } = input;
  const totalMassG = hotMassG + coldMassG;

  if (
    !Number.isFinite(totalMassG) ||
    totalMassG <= 0 ||
    !Number.isFinite(hotTempC) ||
    !Number.isFinite(coldTempC)
  ) {
    return {
      totalMassG: 0,
      equilibriumTempC: 0,
      hotDeltaC: 0,
      coldDeltaC: 0,
      heatGivenJ: 0,
      heatTakenJ: 0,
    };
  }

  const equilibriumTempC =
    (hotMassG * hotTempC + coldMassG * coldTempC) / totalMassG;
  const hotDeltaC = hotTempC - equilibriumTempC;
  const coldDeltaC = equilibriumTempC - coldTempC;

  const heatGivenJ = WATER_SPECIFIC_HEAT * (hotMassG / 1000) * hotDeltaC;
  const heatTakenJ = WATER_SPECIFIC_HEAT * (coldMassG / 1000) * coldDeltaC;

  return {
    totalMassG,
    equilibriumTempC,
    hotDeltaC,
    coldDeltaC,
    heatGivenJ,
    heatTakenJ,
  };
}

export function formatFixed(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return '—';
  return value.toFixed(digits).replace('.', ',');
}

export function formatKilojoules(joules: number): string {
  if (!Number.isFinite(joules)) return '—';
  return `${(joules / 1000).toFixed(2).replace('.', ',')} kJ`;
}
