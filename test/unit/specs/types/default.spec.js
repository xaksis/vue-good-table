import defaultType from '@/components/types/default'

describe('default type', () => {
  describe('compare', () => {
    it('should return -1 if x is before y', () => {
      expect(defaultType.compare('abc', 'abd')).to.equal(-1)
    })

    it('should return 1 if y is before x', () => {
      expect(defaultType.compare('aba', 'aaa')).to.equal(1)
    })

    it('should return 0 if y == x', () => {
      expect(defaultType.compare('aba', 'aba')).to.equal(0)
    })
  })
  describe('format', () => {
    it('should return itself', () => {
      var x = '<div>lorem ipsum</div>'
      expect(defaultType.format(x)).to.equal(x)
    })
  })
  describe('filterPredicate', () => {
    it('should return false if values don\'t match', () => {
      expect(defaultType.filterPredicate('aBc', 'aBcD')).to.equal(false)
    })

    it('should return true if values match', () => {
      expect(defaultType.filterPredicate('aBc', 'aBc')).to.equal(true)
    })

    it('should return true if values match, even if they are mismatch on case', () => {
      expect(defaultType.filterPredicate('aBc', 'AbC')).to.equal(true)
    })
  })
})
