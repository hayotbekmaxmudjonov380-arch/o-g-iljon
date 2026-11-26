import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeHeatEquilibrium,
  estimateMoleculeSize,
  formatFixed,
  formatKilojoules,
  isWithinTolerance,
  MOLECULE_SIZE_OIL_VOLUME_MM3,
  parseNumericInput,
  WATER_SPECIFIC_HEAT,
} from './practicalPhysics';

test('estimateMoleculeSize converts film area and molecule diameter to SI units', () => {
  const result = estimateMoleculeSize(MOLECULE_SIZE_OIL_VOLUME_MM3, 5);

  assert.ok(Math.abs(result.areaCm2 - 19.635) < 0.001);
  assert.ok(Math.abs(result.areaM2 - 1.9635e-3) < 1e-8);
  assert.ok(Math.abs(result.volumeM3 - 4e-12) < 1e-18);
  assert.ok(Math.abs(result.diameterNm - 2.037) < 0.01);
});

test('estimateMoleculeSize rejects invalid input without throwing', () => {
  const zero = estimateMoleculeSize(0, 5);
  const negative = estimateMoleculeSize(0.004, -1);

  assert.equal(zero.diameterNm, 0);
  assert.equal(negative.areaCm2, 0);
});

test('computeHeatEquilibrium returns a mass-weighted temperature', () => {
  const result = computeHeatEquilibrium({
    hotMassG: 200,
    hotTempC: 80,
    coldMassG: 300,
    coldTempC: 20,
  });

  assert.equal(result.totalMassG, 500);
  assert.equal(result.equilibriumTempC, 44);
  assert.equal(result.hotDeltaC, 36);
  assert.equal(result.coldDeltaC, 24);
});

test('computeHeatEquilibrium conserves energy: Q given equals Q taken', () => {
  const result = computeHeatEquilibrium({
    hotMassG: 150,
    hotTempC: 90,
    coldMassG: 250,
    coldTempC: 10,
  });

  assert.ok(Math.abs(result.heatGivenJ - result.heatTakenJ) < 1e-6);
  assert.ok(
    Math.abs(
      result.heatGivenJ -
        WATER_SPECIFIC_HEAT * 0.15 * (90 - result.equilibriumTempC)
    ) < 1e-6
  );
});

test('computeHeatEquilibrium handles empty input safely', () => {
  const result = computeHeatEquilibrium({
    hotMassG: 0,
    hotTempC: 80,
    coldMassG: 0,
    coldTempC: 20,
  });

  assert.equal(result.totalMassG, 0);
  assert.equal(result.heatGivenJ, 0);
});

test('parseNumericInput accepts comma decimals and rejects junk', () => {
  assert.equal(parseNumericInput('2,5'), 2.5);
  assert.equal(parseNumericInput(' 44 '), 44);
  assert.equal(parseNumericInput(''), null);
  assert.equal(parseNumericInput('abc'), null);
});

test('isWithinTolerance checks inclusive bounds', () => {
  assert.equal(isWithinTolerance(5, 5, 0.5), true);
  assert.equal(isWithinTolerance(5.5, 5, 0.5), true);
  assert.equal(isWithinTolerance(5.6, 5, 0.5), false);
});

test('formatting helpers use comma decimals', () => {
  assert.equal(formatFixed(44.04, 1), '44,0');
  assert.equal(formatKilojoules(30240), '30,24 kJ');
});
