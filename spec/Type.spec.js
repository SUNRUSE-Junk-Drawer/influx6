describe("Type", function(){
    var Type, input, originalInput, result, Functions
    var originalFunctions = {
        testFunctionA: {
            returns: "test function a returns"
        },
        testFunctionB: {
            returns: "test function b returns"
        },
        testFunctionC: {
            returns: "test function c returns"
        }
    }
    beforeEach(function(){
        src.__set__("Functions", Functions = JSON.parse(JSON.stringify(originalFunctions)))
        Type = src.__get__("Type")
    })
    describe("constant", function(){
        beforeEach(function(){
            originalInput = {
                constant: "test constant type",
                value: "test constant value"
            }
            input = JSON.parse(JSON.stringify(originalInput))
            result = Type(input)
        })
        it("returns the constant's type", function(){
            expect(result).toEqual("test constant type")
        })
        it("does not modify Functions", function(){
            expect(Functions).toEqual(originalFunctions)
        })        
    })
    describe("function", function(){
        beforeEach(function(){
            originalInput = {
                call: "testFunctionB",
                with: ["anything", "whatsoever"]
            }
            input = JSON.parse(JSON.stringify(originalInput))
            result = Type(input)
        })
        it("returns the function's return type", function(){
            expect(result).toEqual("test function b returns")
        })
        it("does not modify Functions", function(){
            expect(Functions).toEqual(originalFunctions)
        })
    })
})