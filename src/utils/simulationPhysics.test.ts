import test from 'node:test';
import assert from 'node:assert/strict';
import { computeChapterSimulationTelemetry } from './simulationPhysics';

test('Bob 1 Ideal gas law responds inversely to volume and proportionally to temperature', () => {
  const baseline = computeChapterSimulationTelemetry('sim-bob-1', 'bob1-gas', 300, 4.0);
  const compressed = computeChapterSimulationTelemetry('sim-bob-1', 'bob1-gas', 300, 2.0);
  const p1 = parseFloat(baseline.metrics[1].value);
  const p2 = parseFloat(compressed.metrics[1].value);
  assert.ok(Math.abs(p2 / p1 - 2) < 0.02);
});

test('Bob 2 Calorimeter reaches exact thermal midpoint equilibrium', () => {
  const res = computeChapterSimulationTelemetry('sim-bob-2', 'bob2-calorimeter', 460, 260);
  assert.equal(res.metrics[0].value, '360.0 K');
});

test('Bob 3 Carnot efficiency equals (1 - T2/T1) * 100%', () => {
  const res = computeChapterSimulationTelemetry('sim-bob-3', 'bob3-carnot', 600, 300);
  assert.equal(res.metrics[2].value, '50.0 %');
});

test('Bob 4 Capillary rise obeys Jurin law h = 2*sigma / (rho*g*r)', () => {
  const wide = computeChapterSimulationTelemetry('sim-bob-4', 'bob4-capillary', 73, 1.0);
  const narrow = computeChapterSimulationTelemetry('sim-bob-4', 'bob4-capillary', 73, 0.5);
  const hWide = parseFloat(wide.metrics[0].value);
  const hNarrow = parseFloat(narrow.metrics[0].value);
  assert.ok(Math.abs(hNarrow / hWide - 2) < 0.02);
});

test('Bob 5 Snell refraction and TIR threshold match optical equations', () => {
  const snell = computeChapterSimulationTelemetry('sim-bob-5', 'bob5-snell', 30, 1.5);
  // arcsin(sin(30)/1.5) = arcsin(1/3) = 19.47 deg
  assert.equal(snell.metrics[1].value, '19.5°');

  const tir = computeChapterSimulationTelemetry('sim-bob-5', 'bob5-tir', 50, 1.5);
  // critical angle for n=1.5 is 41.8 deg -> 50 deg triggers Total Internal Reflection
  assert.equal(tir.metrics[2].value, 'To‘la qaytish');

  const lens = computeChapterSimulationTelemetry('sim-bob-5', 'bob5-lens', 24, 12);
  // 1/f = 1/12 - 1/24 => f = 24 cm, magnification 1.00x
  assert.equal(lens.metrics[0].value, '24.0 sm');
  assert.equal(lens.metrics[1].value, '1.00×');
});

test('Bob 6 Solar panel reaches 100% cosine alignment at complementary tilt', () => {
  const aligned = computeChapterSimulationTelemetry('sim-bob-6', 'bob6-solar', 60, 30);
  assert.equal(aligned.metrics[1].value, '100 %');

  const cosmos = computeChapterSimulationTelemetry('sim-bob-6', 'bob6-cosmos', 1.0, 1.0);
  assert.equal(cosmos.metrics[0].value, '29.8 km/s');
});
