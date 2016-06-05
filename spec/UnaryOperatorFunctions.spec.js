describe("UnaryOperatorFunctions", function(){
	function Maps(symbol, func){
		it("maps " + symbol + " to " + func, function(){
			var arr = src.__get__("UnaryOperatorFunctions")
			expect(arr[symbol]).not.toBeUndefined()
			expect(arr[symbol].indexOf(func)).not.toEqual(-1)
		})
	}
	Maps("-", "integerNegate")
    Maps("-", "floatNegate")
    Maps("!", "booleanNot")
})