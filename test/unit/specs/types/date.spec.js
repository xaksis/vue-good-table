import dateType from '@/components/types/date'

describe('date type', () => {
  describe('compare', () => {
    it('should compare dates correctly', () => {
      expect(dateType.compare('20001211', '20001112')).to.equal(1)
    })

    it('should compare dates correctly with custom format', () => {
      expect(dateType.compare('20001211', '20001112', {inputFormat: 'YYYYDDMM'})).to.equal(-1)
    })

    it('should compare null date as epoch', () => {
      expect(dateType.compare('20001211', undefined, {inputFormat: 'YYYYDDMM'})).to.equal(1)
    })

    it('should compare null date as epoch', () => {
      expect(dateType.compare(undefined, '20001211', {inputFormat: 'YYYYDDMM'})).to.equal(-1)
    })
  })

  describe('format', () => {
    it('should format dates correctly', () => {
      expect(dateType.format('20001012', {inputFormat: 'YYYYDDMM', outputFormat: 'Do MMM YYYY'})).to.equal('10th Dec 2000')
    })

    it('should format dates correctly', () => {
      expect(dateType.format('20001012', {inputFormat: 'YYYYMMDD', outputFormat: 'Do MMM YYYY'})).to.equal('12th Oct 2000')
    })
  })
})
