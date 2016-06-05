describe("Functions", function(){
    var Functions
    beforeEach(function(){
        Functions = src.__get__("Functions")
    })
    describe("floatPair", function(){
        it("parameters", function(){ expect(Functions.floatPair.parameters).toEqual(["float", "float"]) })
        it("returns", function(){ expect(Functions.floatPair.returns).toEqual("floatPair") })
        it("plurality", function(){ expect(Functions.floatPair.plurality).toEqual("map") })
        it("precompute", function(){ expect(Functions.floatPair.precompute(4.3, -7.5)).toEqual([4.3, -7.5]) })
    })
    describe("floatConditional", function(){
        it("parameters", function(){ expect(Functions.floatConditional.parameters).toEqual(["boolean", "floatPair"]) })
        it("returns", function(){ expect(Functions.floatConditional.returns).toEqual("float") })
        it("plurality", function(){ expect(Functions.floatConditional.plurality).toEqual("map") })
        it("precompute false", function(){ expect(Functions.floatConditional.precompute(false, [4.3, -7.5])).toEqual(-7.5) })
        it("precompute true", function(){ expect(Functions.floatConditional.precompute(true, [4.3, -7.5])).toEqual(4.3) })
    })
    describe("floatAdd", function(){
        it("parameters", function(){ expect(Functions.floatAdd.parameters).toEqual(["float", "float"]) })
        it("returns", function(){ expect(Functions.floatAdd.returns).toEqual("float") })
        it("plurality", function(){ expect(Functions.floatAdd.plurality).toEqual("map") })
        it("precompute", function(){ expect(Functions.floatAdd.precompute(4.3, -7.5)).toEqual(-3.2) })
    })
    describe("floatSubtract", function(){
        it("parameters", function(){ expect(Functions.floatSubtract.parameters).toEqual(["float", "float"]) })
        it("returns", function(){ expect(Functions.floatSubtract.returns).toEqual("float") })
        it("plurality", function(){ expect(Functions.floatSubtract.plurality).toEqual("map") })
        it("precompute", function(){ expect(Functions.floatSubtract.precompute(4.3, -7.5)).toEqual(11.8) })
    })
    describe("floatMultiply", function(){
        it("parameters", function(){ expect(Functions.floatMultiply.parameters).toEqual(["float", "float"]) })
        it("returns", function(){ expect(Functions.floatMultiply.returns).toEqual("float") })
        it("plurality", function(){ expect(Functions.floatMultiply.plurality).toEqual("map") })
        it("precompute", function(){ expect(Functions.floatMultiply.precompute(4.3, -7.5)).toEqual(-32.25) })
    })
    describe("floatNegate", function(){
        it("parameters", function(){ expect(Functions.floatNegate.parameters).toEqual(["float"]) })
        it("returns", function(){ expect(Functions.floatNegate.returns).toEqual("float") })
        it("plurality", function(){ expect(Functions.floatNegate.plurality).toEqual("map") })
        it("precompute positive", function(){ expect(Functions.floatNegate.precompute(4.3)).toEqual(-4.3) })
        it("precompute negative", function(){ expect(Functions.floatNegate.precompute(-4.3)).toEqual(4.3) })
    })
    describe("floatGreaterThan", function(){
        it("parameters", function(){ expect(Functions.floatGreaterThan.parameters).toEqual(["float", "float"]) })
        it("returns", function(){ expect(Functions.floatGreaterThan.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.floatGreaterThan.plurality).toEqual("map") })
        it("precompute false", function(){ expect(Functions.floatGreaterThan.precompute(4.1, 4.3)).toEqual(false) })
        it("precompute true", function(){ expect(Functions.floatGreaterThan.precompute(4.5, 4.3)).toEqual(true) })
    })
    describe("floatLessThan", function(){
        it("parameters", function(){ expect(Functions.floatLessThan.parameters).toEqual(["float", "float"]) })
        it("returns", function(){ expect(Functions.floatLessThan.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.floatLessThan.plurality).toEqual("map") })
        it("precompute false", function(){ expect(Functions.floatLessThan.precompute(4.3, 4.1)).toEqual(false) })
        it("precompute true", function(){ expect(Functions.floatLessThan.precompute(4.3, 4.5)).toEqual(true) })
    })
    describe("floatConcatenate", function(){
        it("parameters", function(){ expect(Functions.floatConcatenate.parameters).toEqual(["float", "float"]) })
        it("returns", function(){ expect(Functions.floatConcatenate.returns).toEqual("float") })
        it("plurality", function(){ expect(Functions.floatConcatenate.plurality).toEqual("concatenate") })
        describe("precompute", function(){
            it("does not modify the inputs", function(){ 
                var a = [4.3, -7.6]
                var b = [-2.1, 5.6, 9.1]
                Functions.floatConcatenate.precompute(a, b)
                expect(a).toEqual([4.3, -7.6])
                expect(b).toEqual([-2.1, 5.6, 9.1])
            })
            it("returns the expected value", function(){ expect(Functions.floatConcatenate.precompute([4.3, -7.6], [-2.1, 5.6, 9.1])).toEqual([4.3, -7.6, -2.1, 5.6, 9.1]) })
        })
        
    })
    describe("floatDot", function(){
        it("parameters", function(){ expect(Functions.floatDot.parameters).toEqual(["float", "float"]) })
        it("returns", function(){ expect(Functions.floatDot.returns).toEqual("float") })
        it("plurality", function(){ expect(Functions.floatDot.plurality).toEqual("reduce") })
        describe("precompute", function(){
            it("does not modify the inputs", function(){
                var a = [4.3, -7.6]
                var b = [-2.1, 5.6]
                Functions.floatDot.precompute(a, b)
                expect(a).toEqual([4.3, -7.6])
                expect(b).toEqual([-2.1, 5.6])
            })
            it("returns the expected value", function(){ expect(Functions.floatDot.precompute([4.3, -7.6], [-2.1, 5.6])).toBeCloseTo(-51.59) })
        })
    })
    
    describe("integerPair", function(){
        it("parameters", function(){ expect(Functions.integerPair.parameters).toEqual(["integer", "integer"]) })
        it("returns", function(){ expect(Functions.integerPair.returns).toEqual("integerPair") })
        it("plurality", function(){ expect(Functions.integerPair.plurality).toEqual("map") })
        it("precompute", function(){ expect(Functions.integerPair.precompute(4, -7)).toEqual([4, -7]) })
    })
    describe("integerConditional", function(){
        it("parameters", function(){ expect(Functions.integerConditional.parameters).toEqual(["boolean", "integerPair"]) })
        it("returns", function(){ expect(Functions.integerConditional.returns).toEqual("integer") })
        it("plurality", function(){ expect(Functions.integerConditional.plurality).toEqual("map") })
        it("precompute false", function(){ expect(Functions.integerConditional.precompute(false, [4, -7])).toEqual(-7) })
        it("precompute true", function(){ expect(Functions.integerConditional.precompute(true, [4, -7])).toEqual(4) })
    })
    describe("integerAdd", function(){
        it("parameters", function(){ expect(Functions.integerAdd.parameters).toEqual(["integer", "integer"]) })
        it("returns", function(){ expect(Functions.integerAdd.returns).toEqual("integer") })
        it("plurality", function(){ expect(Functions.integerAdd.plurality).toEqual("map") })
        it("precompute", function(){ expect(Functions.integerAdd.precompute(4, -7)).toEqual(-3) })
    })
    describe("integerSubtract", function(){
        it("parameters", function(){ expect(Functions.integerSubtract.parameters).toEqual(["integer", "integer"]) })
        it("returns", function(){ expect(Functions.integerSubtract.returns).toEqual("integer") })
        it("plurality", function(){ expect(Functions.integerSubtract.plurality).toEqual("map") })
        it("precompute", function(){ expect(Functions.integerSubtract.precompute(4, -7)).toEqual(11) })
    })
    describe("integerMultiply", function(){
        it("parameters", function(){ expect(Functions.integerMultiply.parameters).toEqual(["integer", "integer"]) })
        it("returns", function(){ expect(Functions.integerMultiply.returns).toEqual("integer") })
        it("plurality", function(){ expect(Functions.integerMultiply.plurality).toEqual("map") })
        it("precompute", function(){ expect(Functions.integerMultiply.precompute(4, -7)).toEqual(-28) })
    })
    describe("integerNegate", function(){
        it("parameters", function(){ expect(Functions.integerNegate.parameters).toEqual(["integer"]) })
        it("returns", function(){ expect(Functions.integerNegate.returns).toEqual("integer") })
        it("plurality", function(){ expect(Functions.integerNegate.plurality).toEqual("map") })
        it("precompute positive", function(){ expect(Functions.integerNegate.precompute(4)).toEqual(-4)})
        it("precompute negative", function(){ expect(Functions.integerNegate.precompute(-4)).toEqual(4) })
    })
    describe("integerGreaterThan", function(){
        it("parameters", function(){ expect(Functions.integerGreaterThan.parameters).toEqual(["integer", "integer"]) })
        it("returns", function(){ expect(Functions.integerGreaterThan.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.integerGreaterThan.plurality).toEqual("map") })
        it("precompute false", function(){ expect(Functions.integerGreaterThan.precompute(3, 4)).toEqual(false) })
        it("precompute equal", function(){ expect(Functions.integerGreaterThan.precompute(4, 4)).toEqual(false) })
        it("precompute true", function(){ expect(Functions.integerGreaterThan.precompute(5, 4)).toEqual(true) })
    })
    describe("integerLessThan", function(){
        it("parameters", function(){ expect(Functions.integerLessThan.parameters).toEqual(["integer", "integer"]) })
        it("returns", function(){ expect(Functions.integerLessThan.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.integerLessThan.plurality).toEqual("map") })
        it("precompute false", function(){ expect(Functions.integerLessThan.precompute(5, 4)).toEqual(false) })
        it("precompute equal", function(){ expect(Functions.integerLessThan.precompute(4, 4)).toEqual(false) })
        it("precompute true", function(){ expect(Functions.integerLessThan.precompute(3, 4)).toEqual(true) })
    })
    describe("integerConcatenate", function(){
        it("parameters", function(){ expect(Functions.integerConcatenate.parameters).toEqual(["integer", "integer"]) })
        it("returns", function(){ expect(Functions.integerConcatenate.returns).toEqual("integer") })
        it("plurality", function(){ expect(Functions.integerConcatenate.plurality).toEqual("concatenate") })
        describe("precompute", function(){
            it("does not modify the inputs", function(){ 
                var a = [4, -7]
                var b = [-2, 5, 9]
                Functions.integerConcatenate.precompute(a, b)
                expect(a).toEqual([4, -7])
                expect(b).toEqual([-2, 5, 9])
            })
            it("returns the expected value", function(){ expect(Functions.integerConcatenate.precompute([4, -7], [-2, 5, 9])).toEqual([4, -7, -2, 5, 9]) })
        })
    })
    
    describe("integerDot", function(){
        it("parameters", function(){ expect(Functions.integerDot.parameters).toEqual(["integer", "integer"]) })
        it("returns", function(){ expect(Functions.integerDot.returns).toEqual("integer") })
        it("plurality", function(){ expect(Functions.integerDot.plurality).toEqual("reduce") })
        describe("precompute", function(){
            it("does not modify the inputs", function(){
                var a = [4, -7]
                var b = [-2, 5]
                Functions.integerDot.precompute(a, b)
                expect(a).toEqual([4, -7])
                expect(b).toEqual([-2, 5])
            })
            it("returns the expected value", function(){ expect(Functions.integerDot.precompute([4, -7], [-2, 5])).toBeCloseTo(-43) })
        })
    })
    
    describe("booleanPair", function(){
        it("parameters", function(){ expect(Functions.booleanPair.parameters).toEqual(["boolean", "boolean"]) })
        it("returns", function(){ expect(Functions.booleanPair.returns).toEqual("booleanPair") })
        it("plurality", function(){ expect(Functions.booleanPair.plurality).toEqual("map") })
        it("precompute false false", function(){ expect(Functions.booleanPair.precompute(false, false)).toEqual([false, false]) })
        it("precompute false true", function(){ expect(Functions.booleanPair.precompute(false, true)).toEqual([false, true]) })
        it("precompute true false", function(){ expect(Functions.booleanPair.precompute(true, false)).toEqual([true, false]) })
        it("precompute true true", function(){ expect(Functions.booleanPair.precompute(true, true)).toEqual([true, true]) })
    })
    describe("booleanConditional", function(){
        it("parameters", function(){ expect(Functions.booleanConditional.parameters).toEqual(["boolean", "booleanPair"]) })
        it("returns", function(){ expect(Functions.booleanConditional.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.booleanConditional.plurality).toEqual("map") })
        it("precompute false false false", function(){ expect(Functions.booleanConditional.precompute(false, [false, false])).toEqual(false) })
        it("precompute true false false", function(){ expect(Functions.booleanConditional.precompute(true, [false, false])).toEqual(false) })
        it("precompute false true false", function(){ expect(Functions.booleanConditional.precompute(false, [true, false])).toEqual(false) })
        it("precompute true true false", function(){ expect(Functions.booleanConditional.precompute(true, [true, false])).toEqual(true) })
        it("precompute false false true", function(){ expect(Functions.booleanConditional.precompute(false, [false, true])).toEqual(true) })
        it("precompute true false true", function(){ expect(Functions.booleanConditional.precompute(true, [false, true])).toEqual(false) })
        it("precompute false true true", function(){ expect(Functions.booleanConditional.precompute(false, [true, true])).toEqual(true) })
        it("precompute true true true", function(){ expect(Functions.booleanConditional.precompute(true, [true, true])).toEqual(true) })
    })
    describe("booleanConcatenate", function(){
        it("parameters", function(){ expect(Functions.booleanConcatenate.parameters).toEqual(["boolean", "boolean"]) })
        it("returns", function(){ expect(Functions.booleanConcatenate.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.booleanConcatenate.plurality).toEqual("concatenate") })
        describe("precompute", function(){
            it("does not modify the inputs", function(){ 
                var a = [true, true]
                var b = [false, true, false]
                Functions.booleanConcatenate.precompute(a, b)
                expect(a).toEqual([true, true])
                expect(b).toEqual([false, true, false])
            })
            it("returns the expected value", function(){ expect(Functions.booleanConcatenate.precompute([true, true], [false, true, false])).toEqual([true, true, false, true, false]) })
        })
    })
    describe("booleanAnd", function(){
        it("parameters", function(){ expect(Functions.booleanAnd.parameters).toEqual(["boolean", "boolean"]) })
        it("returns", function(){ expect(Functions.booleanAnd.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.booleanAnd.plurality).toEqual("map") })
        it("precompute false false", function(){ expect(Functions.booleanAnd.precompute(false, false)).toEqual(false) })
        it("precompute false true", function(){ expect(Functions.booleanAnd.precompute(false, true)).toEqual(false) })
        it("precompute true false", function(){ expect(Functions.booleanAnd.precompute(true, false)).toEqual(false) })
        it("precompute true true", function(){ expect(Functions.booleanAnd.precompute(true, true)).toEqual(true) })
    })
    describe("booleanOr", function(){
        it("parameters", function(){ expect(Functions.booleanOr.parameters).toEqual(["boolean", "boolean"]) })
        it("returns", function(){ expect(Functions.booleanOr.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.booleanOr.plurality).toEqual("map") })
        it("precompute false false", function(){ expect(Functions.booleanOr.precompute(false, false)).toEqual(false) })
        it("precompute false true", function(){ expect(Functions.booleanOr.precompute(false, true)).toEqual(true) })
        it("precompute true false", function(){ expect(Functions.booleanOr.precompute(true, false)).toEqual(true) })
        it("precompute true true", function(){ expect(Functions.booleanOr.precompute(true, true)).toEqual(true) })
    })
    describe("booleanNot", function(){
        it("parameters", function(){ expect(Functions.booleanNot.parameters).toEqual(["boolean"]) })
        it("returns", function(){ expect(Functions.booleanNot.returns).toEqual("boolean") })
        it("plurality", function(){ expect(Functions.booleanNot.plurality).toEqual("map") })
        it("precompute false", function(){ expect(Functions.booleanNot.precompute(false)).toEqual(true) })
        it("precompute true", function(){ expect(Functions.booleanNot.precompute(true)).toEqual(false) })
    })
})