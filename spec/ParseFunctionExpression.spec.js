describe("ParseFunctionExpression", function(){
    function Run(config) {
        var ParseFunctionExpression, argumentTrees, functionNames, Functions
        beforeEach(function(){
            ParseFunctionExpression = src.__get__("ParseFunctionExpression")
            src.__set__("Functions", Functions = JSON.parse(JSON.stringify(config.functions)))
            argumentTrees = JSON.parse(JSON.stringify(config.argumentTrees))
            functionNames = JSON.parse(JSON.stringify(config.functionNames))
            src.__set__("Type", function(expr) {
                expect(config.expressionTypeMappings).not.toBeUndefined("Unexpected call to Type")
                expect(config.expressionTypeMappings[expr]).not.toBeUndefined("Unexpected call to Type with \"" + expr + "\"")
                return config.expressionTypeMappings[expr]
            })
            src.__set__("ParseExpression", function(tree) {
                expect(config.parseExpressionMappings).not.toBeUndefined("Unexpected call to ParseExpression")
                expect(config.parseExpressionMappings[tree]).not.toBeUndefined("Unexpected call to ParseExpression with \"" + tree + "\"")
                return config.parseExpressionMappings[tree]
            })
        })
        it("does not modify the argument trees", function(){
            try { ParseFunctionExpression(argumentTrees, functionNames) } catch(ex) {}
            expect(argumentTrees).toEqual(config.argumentTrees)
        })
        it("does not modify the function names", function(){
            try { ParseFunctionExpression(argumentTrees, functionNames) } catch(ex) {}
            expect(functionNames).toEqual(config.functionNames)
        })
        it("does not modify the functions", function(){
            try { ParseFunctionExpression(argumentTrees, functionNames) } catch(ex) {}
            expect(Functions).toEqual(config.functions)
        })
        if (config.throws) {
            it("throws the expected exception", function(){
                expect(function() { ParseFunctionExpression(argumentTrees, functionNames) }).toThrow(config.throws)
            })
        } else {
            it("returns the expected result", function(){
                expect(ParseFunctionExpression(argumentTrees, functionNames)).toEqual(config.outputs)
            })
        }
    }
    
    describe("when no overload has the correct number of arguments", function(){
        Run({
            argumentTrees: ["testArgumentTreeA", "testArgumentTreeB"],
            functionNames: ["tooFewArguments", "tooManyArguments"],
            functions: {
                tooFewArguments: {
                    parameters: ["test type a"]
                },
                tooManyArguments: {
                    parameters: ["test type a", "test type b", "test type c"]
                }
            },
            parseExpressionMappings: {
                testArgumentTreeA: "testExpressionA",
                testArgumentTreeB: "testExpressionB"
            },
            expressionTypeMappings: {
                testExpressionA: "test type a",
                testExpressionB: "test type b"
            },
            throws: {
                reason: "noMatchingFunction"
            }
        })
    })
    
    describe("when an argument tree cannot be parsed to an expression", function(){
        Run({
            argumentTrees: ["testArgumentTreeA", "testArgumentTreeB"],
            functionNames: ["tooFewArguments", "rightNumberOfArgumentsA", "tooManyArguments", "rightNumberOfArgumentsB"],
            functions: {
                tooFewArguments: {
                    parameters: ["test type a"]
                },
                tooManyArguments: {
                    parameters: ["test type a", "test type b", "test type c"]
                },
                rightNumberOfArgumentsA: {
                    parameters: ["test type b", "test type c"]
                },
                rightNumberOfArgumentsB: {
                    parameters: ["test type a", "test type b"]
                }
            },
            parseExpressionMappings: {
                testArgumentTreeA: "testExpressionA",
                testArgumentTreeB: null
            },
            expressionTypeMappings: {
                testExpressionA: "test type a",
                testExpressionB: "test type b"
            },
            throws: {
                reason: "invalidExpression"
            }
        })
    })
    
    describe("when no overload has the correct arguments", function(){
        Run({
            argumentTrees: ["testArgumentTreeA", "testArgumentTreeB"],
            functionNames: ["tooFewArguments", "rightNumberOfArgumentsA", "tooManyArguments", "rightNumberOfArgumentsB"],
            functions: {
                tooFewArguments: {
                    parameters: ["test type a"]
                },
                tooManyArguments: {
                    parameters: ["test type a", "test type b", "test type c"]
                },
                rightNumberOfArgumentsA: {
                    parameters: ["test type b", "test type c"]
                },
                rightNumberOfArgumentsB: {
                    parameters: ["test type b", "test type a"]
                }
            },
            parseExpressionMappings: {
                testArgumentTreeA: "testExpressionA",
                testArgumentTreeB: "testExpressionB"
            },
            expressionTypeMappings: {
                testExpressionA: "test type a",
                testExpressionB: "test type b"
            },
            throws: {
                reason: "noMatchingFunction"
            }
        })
    })
    
    describe("when no referenced overload has the correct arguments", function(){
        Run({
            argumentTrees: ["testArgumentTreeA", "testArgumentTreeB"],
            functionNames: ["tooFewArguments", "rightNumberOfArgumentsA", "tooManyArguments"],
            functions: {
                tooFewArguments: {
                    parameters: ["test type a"]
                },
                tooManyArguments: {
                    parameters: ["test type a", "test type b", "test type c"]
                },
                rightNumberOfArgumentsA: {
                    parameters: ["test type b", "test type c"]
                },
                rightNumberOfArgumentsB: {
                    parameters: ["test type a", "test type b"]
                }
            },
            parseExpressionMappings: {
                testArgumentTreeA: "testExpressionA",
                testArgumentTreeB: "testExpressionB"
            },
            expressionTypeMappings: {
                testExpressionA: "test type a",
                testExpressionB: "test type b"
            },
            throws: {
                reason: "noMatchingFunction"
            }
        })
    })
    
    describe("when an overload matches", function(){
        Run({
            argumentTrees: ["testArgumentTreeA", "testArgumentTreeB"],
            functionNames: ["tooFewArguments", "rightNumberOfArgumentsA", "rightNumberOfArgumentsB", "tooManyArguments"],
            functions: {
                tooFewArguments: {
                    parameters: ["test type a"]
                },
                tooManyArguments: {
                    parameters: ["test type a", "test type b", "test type c"]
                },
                rightNumberOfArgumentsA: {
                    parameters: ["test type b", "test type c"]
                },
                rightNumberOfArgumentsB: {
                    parameters: ["test type a", "test type b"]
                }
            },
            parseExpressionMappings: {
                testArgumentTreeA: "testExpressionA",
                testArgumentTreeB: "testExpressionB"
            },
            expressionTypeMappings: {
                testExpressionA: "test type a",
                testExpressionB: "test type b"
            },
            outputs: {
                call: "rightNumberOfArgumentsB",
                with: ["testExpressionA", "testExpressionB"]
            }
        })
    })
})