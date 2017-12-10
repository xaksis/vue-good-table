import decimalType from '../../../../src/components/types/decimal'
import { expect } from 'chai'

describe('decimal type', () => {
  describe('format', () => {
    it('should format always with two decimals', () => {
      expect(decimalType.format('1')).to.equal('1.00')
    })

    it('should cut at two decimals', () => {
      expect(decimalType.format('3.14159265359')).to.equal('3.14')
    })
  })
})
