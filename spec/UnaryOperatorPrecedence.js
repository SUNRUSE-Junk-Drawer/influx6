describe("UnaryOperatorPrecedence", function(){
	function Ordering(over, under){
		it(over + " over " + under, function(){
			var arr = src.__get__("UnaryOperatorPrecedence")
			expect(arr.indexOf(over)).not.toEqual(-1)
			expect(arr.indexOf(under)).not.toEqual(-1)
			expect(arr.indexOf(over) < arr.indexOf(under)).toBeTruthy()
		})
	}
	Ordering("!", "-")
})