import percentageType from '@/components/types/percentage'

describe('percentage type', () => {
  describe('format', () => {
    it('should return the percentage formatted answer if passed over 100%', () => {
      var x = '2'
      expect(percentageType.format(x)).to.equal('200.00%')
    })

    it('should return the percentage formatted answer if passed under 50%', () => {
      var x = '.5'
      expect(percentageType.format(x)).to.equal('50.00%')
    })
  })
})
