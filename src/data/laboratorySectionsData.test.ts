import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getLaboratorySubSectionById,
  LABORATORY_SUBSECTIONS,
} from './laboratorySectionsData';

test('laboratory module is divided into exact two sections: Amaliy and Laboratoriya mashgulotlari', () => {
  assert.equal(LABORATORY_SUBSECTIONS.length, 2);
  assert.deepEqual(
    LABORATORY_SUBSECTIONS.map((s) => s.title),
    ['Amaliy mashg‘ulotlar', 'Laboratoriya mashg‘ulotlari']
  );
  assert.deepEqual(
    LABORATORY_SUBSECTIONS.map((s) => s.code),
    ['01', '02']
  );
});

test('getLaboratorySubSectionById resolves valid ids and returns undefined otherwise', () => {
  assert.equal(getLaboratorySubSectionById(null), undefined);
  assert.equal(
    getLaboratorySubSectionById('amaliy-mashgulotlar')?.title,
    'Amaliy mashg‘ulotlar'
  );
  assert.equal(
    getLaboratorySubSectionById('laboratoriya-mashgulotlari')?.title,
    'Laboratoriya mashg‘ulotlari'
  );
  assert.equal(getLaboratorySubSectionById('invalid'), undefined);
});
