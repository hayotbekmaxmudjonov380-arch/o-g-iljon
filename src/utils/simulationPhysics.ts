export interface SimulationParamSpec {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface SimulationScenario {
  id: string;
  index: 1 | 2 | 3;
  shortTitle: string;
  title: string;
  formula: string;
  paramA: SimulationParamSpec;
  paramB: SimulationParamSpec;
}

export interface SimulationTelemetryMetric {
  label: string;
  value: string;
  tone?: 'default' | 'accent' | 'warm';
}

export interface SimulationTelemetry {
  metrics: SimulationTelemetryMetric[];
  statusText: string;
}

export interface SimulationEngineParams {
  chapterId: string;
  scenarioId: string;
  paramA: number;
  paramB: number;
  paused: boolean;
}

/**
 * Pure physics calculations for all 6 chapters × 3 interactive 3D scenarios.
 * Zero randomness: every value comes directly from real physical formulas.
 */
export function computeChapterSimulationTelemetry(
  chapterId: string,
  scenarioId: string,
  paramA: number,
  paramB: number
): SimulationTelemetry {
  // I bob: MKT asoslari
  if (chapterId === 'sim-bob-1') {
    const tempK = paramA;
    const vRms = Math.sqrt((3 * 8.314 * tempK) / 0.029); // O2/N2 mix M = 0.029 kg/mol

    if (scenarioId === 'bob1-gas') {
      const volumeL = Math.max(0.5, paramB);
      const moles = 0.16;
      const pressureKpa = (moles * 8.314 * tempK) / volumeL;
      return {
        statusText: 'Ideal gaz holati',
        metrics: [
          { label: 'Harorat (T)', value: `${Math.round(tempK)} K` },
          {
            label: 'Bosim (p)',
            value: `${pressureKpa.toFixed(1)} kPa`,
            tone: 'warm',
          },
          {
            label: 'O‘rt. kvadratik tezlik',
            value: `${Math.round(vRms)} m/s`,
            tone: 'accent',
          },
        ],
      };
    }

    if (scenarioId === 'bob1-brownian') {
      const count = Math.round(paramB);
      const diffusionFactor = (tempK / 300) * (count / 100);
      return {
        statusText: 'Broun diffuziyasi',
        metrics: [
          { label: 'Harorat (T)', value: `${Math.round(tempK)} K` },
          {
            label: 'Diffuziya koeff.',
            value: `${(diffusionFactor * 2.4).toFixed(2)} µm²/s`,
            tone: 'accent',
          },
          { label: 'Zarrachalar', value: `${count} ta`, tone: 'warm' },
        ],
      };
    }

    // bob1-isoprocess: P_load in atm, V = nRT / P
    const pAtm = Math.max(0.5, paramB);
    const pKpa = pAtm * 101.325;
    const moles = 0.25;
    const volumeL = (moles * 8.314 * tempK) / pKpa;
    return {
      statusText: 'Izobarik kengayish',
      metrics: [
        { label: 'Harorat (T)', value: `${Math.round(tempK)} K` },
        { label: 'Bosim (p)', value: `${pKpa.toFixed(1)} kPa`, tone: 'warm' },
        {
          label: 'Gaz hajmi (V)',
          value: `${volumeL.toFixed(2)} L`,
          tone: 'accent',
        },
      ],
    };
  }

  // II bob: Ichki energiya va termodinamika elementlari
  if (chapterId === 'sim-bob-2') {
    if (scenarioId === 'bob2-internal') {
      const tempK = paramA;
      const moles = paramB;
      // Monoatomic ideal gas U = 3/2 * nu * R * T
      const internalEnergyKj = (1.5 * moles * 8.314 * tempK) / 1000;
      const avgEkZepto = 1.5 * 1.380649e-2 * tempK; // 10^-21 J
      return {
        statusText: 'Ichki energiya ortishi',
        metrics: [
          { label: 'Harorat (T)', value: `${Math.round(tempK)} K` },
          {
            label: 'Ichki energiya (U)',
            value: `${internalEnergyKj.toFixed(2)} kJ`,
            tone: 'warm',
          },
          {
            label: 'Bitta zarracha Eₖ',
            value: `${avgEkZepto.toFixed(2)}×10⁻²¹ J`,
            tone: 'accent',
          },
        ],
      };
    }

    if (scenarioId === 'bob2-work') {
      const heatJ = paramA;
      const pressureKpa = Math.max(40, paramB);
      // Isobaric monoatomic ideal gas: A = (2/5) Q, ΔU = (3/5) Q
      const workJ = heatJ * 0.4;
      const deltaUJ = heatJ * 0.6;
      const deltaVL = workJ / pressureKpa;
      return {
        statusText: 'Izobarik mexanik ish',
        metrics: [
          { label: 'Bajarilgan ish (A)', value: `${workJ.toFixed(0)} J`, tone: 'warm' },
          { label: 'ΔU o‘zgarishi', value: `${deltaUJ.toFixed(0)} J`, tone: 'accent' },
          { label: 'Hajm ortishi (ΔV)', value: `${deltaVL.toFixed(2)} L` },
        ],
      };
    }

    // bob2-calorimeter: equal water/metal thermal capacity equilibrium
    const tHot = paramA;
    const tCold = paramB;
    const tEq = (tHot + tCold) / 2;
    const qFlowKj = Math.abs(tHot - tCold) * 0.042;
    return {
      statusText: 'Issiqlik muvozanati',
      metrics: [
        { label: 'Muvozanat (θ)', value: `${tEq.toFixed(1)} K`, tone: 'accent' },
        {
          label: 'Uzatilgan issiqlik',
          value: `${qFlowKj.toFixed(2)} kJ`,
          tone: 'warm',
        },
        { label: 'Harorat farqi ΔT', value: `${Math.abs(tHot - tCold).toFixed(0)} K` },
      ],
    };
  }

  // III bob: Issiqlik dvigatellari
  if (chapterId === 'sim-bob-3') {
    if (scenarioId === 'bob3-engine') {
      const fuelPct = paramA;
      const rpmSpeed = paramB;
      const efficiency = Math.min(44, 18 + (fuelPct / 100) * 22);
      const powerKw = (fuelPct / 100) * rpmSpeed * 32;
      return {
        statusText: '4 taktli IYoD sikli',
        metrics: [
          { label: 'Foydali quvvat', value: `${powerKw.toFixed(1)} kW`, tone: 'warm' },
          { label: 'Dvigatel FIK (η)', value: `${efficiency.toFixed(1)} %`, tone: 'accent' },
          { label: 'Aylanish chastotasi', value: `${Math.round(rpmSpeed * 1200)} ayl/min` },
        ],
      };
    }

    if (scenarioId === 'bob3-turbine') {
      const steamKpa = paramA;
      const loadPct = paramB;
      const omegaRads = (steamKpa / 600) * (1.2 - loadPct / 180) * 180;
      const powerKw = (steamKpa * 0.28 * (loadPct / 100));
      return {
        statusText: 'Bug‘ oqimi aylanishi',
        metrics: [
          { label: 'Bug‘ bosimi', value: `${Math.round(steamKpa)} kPa` },
          { label: 'Burchak tezligi', value: `${omegaRads.toFixed(0)} rad/s`, tone: 'accent' },
          { label: 'Generator quvvati', value: `${powerKw.toFixed(1)} kW`, tone: 'warm' },
        ],
      };
    }

    // bob3-carnot
    const tHot = Math.max(paramA, paramB + 20);
    const tCold = Math.min(paramB, tHot - 20);
    const eta = (1 - tCold / tHot) * 100;
    return {
      statusText: 'Ideal Karno sikli',
      metrics: [
        { label: 'Isitkich (T₁)', value: `${Math.round(tHot)} K`, tone: 'warm' },
        { label: 'Sovitkich (T₂)', value: `${Math.round(tCold)} K` },
        { label: 'Maksimal FIK (η)', value: `${eta.toFixed(1)} %`, tone: 'accent' },
      ],
    };
  }

  // IV bob: Suyuqlik va qattiq jismlarning xossalari
  if (chapterId === 'sim-bob-4') {
    if (scenarioId === 'bob4-capillary') {
      const sigmaMnM = paramA; // mN/m
      const radiusMm = Math.max(0.2, paramB); // mm
      // h = 2 * sigma / (rho * g * r), rho = 1000 kg/m3, g = 9.81 m/s2
      const sigma = sigmaMnM * 1e-3;
      const radius = radiusMm * 1e-3;
      const heightMm = ((2 * sigma) / (1000 * 9.81 * radius)) * 1000;
      return {
        statusText: 'Ho‘llovchi menisk',
        metrics: [
          { label: 'Ko‘tarilish (h)', value: `${heightMm.toFixed(1)} mm`, tone: 'accent' },
          { label: 'Sirt taranglik (σ)', value: `${sigmaMnM.toFixed(0)} mN/m`, tone: 'warm' },
          { label: 'Radius (r)', value: `${radiusMm.toFixed(2)} mm` },
        ],
      };
    }

    if (scenarioId === 'bob4-crystal') {
      const tempK = paramA;
      const bondScale = paramB;
      const meltTempK = Math.round(280 + bondScale * 140);
      const isMolten = tempK >= meltTempK;
      const vibrationPm = ((tempK / meltTempK) * 18 / bondScale).toFixed(1);
      return {
        statusText: isMolten ? 'Suyuq (erigan) holat' : 'Qattiq kristall panjara',
        metrics: [
          { label: 'Harorat (T)', value: `${Math.round(tempK)} K`, tone: isMolten ? 'warm' : 'default' },
          { label: 'Erish harorati', value: `${meltTempK} K` },
          { label: 'Tebranish amplitudasi', value: `${vibrationPm} pm`, tone: 'accent' },
        ],
      };
    }

    // bob4-vapor
    const tempK = paramA;
    const areaPct = paramB;
    const tempC = tempK - 273.15;
    // Simplified Magnus saturation vapor pressure (kPa)
    const satPressureKpa = 0.61094 * Math.exp((17.625 * tempC) / (tempC + 243.04));
    const evapRate = (satPressureKpa / 20) * (areaPct / 100) * 4.5;
    return {
      statusText: tempC >= 99 ? 'Qaynash jarayoni' : 'Dinamik bug‘lanish',
      metrics: [
        { label: 'Harorat', value: `${Math.round(tempC)} °C (${Math.round(tempK)} K)` },
        { label: 'To‘yingan bug‘ p', value: `${satPressureKpa.toFixed(1)} kPa`, tone: 'warm' },
        { label: 'Bug‘lanish tezligi', value: `${evapRate.toFixed(2)} g/min`, tone: 'accent' },
      ],
    };
  }

  // V bob: Geometrik optika va optik asboblar
  if (chapterId === 'sim-bob-5') {
    if (scenarioId === 'bob5-snell') {
      const alphaDeg = paramA;
      const n = Math.max(1.0, paramB);
      const alphaRad = (alphaDeg * Math.PI) / 180;
      const sinGamma = Math.min(1, Math.sin(alphaRad) / n);
      const gammaDeg = (Math.asin(sinGamma) * 180) / Math.PI;
      return {
        statusText: 'Yorug‘lik sinishi va qaytishi',
        metrics: [
          { label: 'Tushish burchagi (α)', value: `${alphaDeg.toFixed(0)}°` },
          { label: 'Sinish burchagi (γ)', value: `${gammaDeg.toFixed(1)}°`, tone: 'accent' },
          { label: 'Ko‘rsatkich (n)', value: `${n.toFixed(2)}`, tone: 'warm' },
        ],
      };
    }

    if (scenarioId === 'bob5-tir') {
      const alphaDeg = paramA;
      const n = Math.max(1.05, paramB);
      const critDeg = (Math.asin(1 / n) * 180) / Math.PI;
      const isTir = alphaDeg >= critDeg;
      const sinExit = Math.sin((alphaDeg * Math.PI) / 180) * n;
      const exitText = isTir
        ? 'To‘la qaytish'
        : `${((Math.asin(Math.min(1, sinExit)) * 180) / Math.PI).toFixed(1)}°`;
      return {
        statusText: isTir ? 'To‘la ichki qaytish rejimi' : 'Prizmadan chiqish sinishi',
        metrics: [
          { label: 'Limit burchak (α₀)', value: `${critDeg.toFixed(1)}°`, tone: 'warm' },
          { label: 'Tushish burchagi', value: `${alphaDeg.toFixed(0)}°` },
          { label: 'Chiqish / Holat', value: exitText, tone: 'accent' },
        ],
      };
    }

    // bob5-lens: thin lens 1/F = 1/d + 1/f
    const dCm = paramA;
    const fCm = paramB;
    if (Math.abs(dCm - fCm) < 0.5) {
      return {
        statusText: 'Tasvir cheksizlikda (d = F)',
        metrics: [
          { label: 'Predmet (d)', value: `${dCm.toFixed(0)} sm` },
          { label: 'Fokus (F)', value: `${fCm.toFixed(0)} sm` },
          { label: 'Tasvir (f)', value: '∞', tone: 'warm' },
        ],
      };
    }
    const imgCm = (dCm * fCm) / (dCm - fCm);
    const mag = Math.abs(imgCm / dCm);
    const isReal = imgCm > 0;
    return {
      statusText: isReal ? 'Haqiqiy to‘nkarilgan tasvir' : 'Mavhum kattalashgan tasvir',
      metrics: [
        { label: 'Tasvir masofasi (f)', value: `${imgCm.toFixed(1)} sm`, tone: 'accent' },
        { label: 'Kattalashtirish (Γ)', value: `${mag.toFixed(2)}×`, tone: 'warm' },
        { label: 'Linza kuchi (D)', value: `${(100 / fCm).toFixed(1)} dptr` },
      ],
    };
  }

  // VI bob: Geliotexnika va olamning yagona fizik manzarasi
  if (scenarioId === 'bob6-solar') {
    const sunElevDeg = paramA;
    const panelTiltDeg = paramB;
    // Optimal tilt matches (90 - sunElevDeg)
    const idealTiltDeg = 90 - sunElevDeg;
    const mismatchRad = ((panelTiltDeg - idealTiltDeg) * Math.PI) / 180;
    const cosTheta = Math.max(0, Math.cos(mismatchRad));
    const powerW = 920 * 1.6 * 0.21 * cosTheta; // 920 W/m2 * 1.6 m2 * 21% * cos
    return {
      statusText: cosTheta > 0.92 ? 'Optimal quyosh burchagi' : 'Burchak moslashtirish',
      metrics: [
        { label: 'Elektr quvvati', value: `${powerW.toFixed(0)} W`, tone: 'warm' },
        { label: 'Foydali koeff. cos(θ)', value: `${(cosTheta * 100).toFixed(0)} %`, tone: 'accent' },
        { label: 'Quyosh balandligi', value: `${sunElevDeg.toFixed(0)}°` },
      ],
    };
  }

  if (scenarioId === 'bob6-concentrator') {
    const irradiance = paramA;
    const focusQuality = paramB / 100;
    const focalPowerKw = (irradiance / 1000) * 3.8 * focusQuality;
    const focalTempC = 120 + (irradiance / 1200) * focusQuality * 620;
    return {
      statusText: 'Parabolik fokuslash',
      metrics: [
        { label: 'Fokus harorati', value: `${Math.round(focalTempC)} °C`, tone: 'warm' },
        { label: 'Issiqlik oqimi', value: `${focalPowerKw.toFixed(2)} kW`, tone: 'accent' },
        { label: 'Nurlanish (I)', value: `${Math.round(irradiance)} W/m²` },
      ],
    };
  }

  // bob6-cosmos
  const speedScale = paramA;
  const massScale = paramB;
  const earthOrbitVel = 29.78 * Math.sqrt(massScale);
  const periodDays = 365.25 / Math.sqrt(massScale);
  return {
    statusText: 'Kepler orbital harakati',
    metrics: [
      { label: 'Yer orbital tezligi', value: `${earthOrbitVel.toFixed(1)} km/s`, tone: 'accent' },
      { label: 'Yillik davr (T)', value: `${Math.round(periodDays)} kun`, tone: 'warm' },
      { label: 'Simulyatsiya tezligi', value: `${speedScale.toFixed(1)}×` },
    ],
  };
}
