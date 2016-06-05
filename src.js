function FindSplittingSymbol(str, starts, symbol, found, notFound){
	var index = str.indexOf(symbol)
	if (index == -1) return notFound()
	return found(str.slice(0, index), str.slice(index + symbol.length), starts + index + symbol.length)
}

Functions = {
	floatPair: {
		parameters: ["float", "float"],
		returns: "floatPair",
		plurality: "map",
		precompute: function(a, b) { return [a, b] }
	},
	floatConditional: {
		parameters: ["boolean", "floatPair"],
		returns: "float",
		plurality: "map",
		precompute: function(condition, options) { return options[condition ? 0 : 1] }
	},
	floatMultiply: {
		parameters: ["float", "float"],
		returns: "float",
		plurality: "map",
		precompute: function(a, b) { return a * b }
	},
	floatAdd: {
		parameters: ["float", "float"],
		returns: "float",
		plurality: "map",
		precompute: function(a, b) { return a + b }
	},
	floatSubtract: {
		parameters: ["float", "float"],
		returns: "float",
		plurality: "map",
		precompute: function(a, b) { return a - b }
	},
	floatNegate: {
		parameters: ["float"],
		returns: "float",
		plurality: "map",
		precompute: function(a) { return -a }
	},
	floatGreaterThan: {
		parameters: ["float", "float"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a > b }
	},
	floatLessThan: {
		parameters: ["float", "float"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a < b }
	},
	floatConcatenate: {
		parameters: ["float", "float"],
		returns: "float",
		plurality: "concatenate",
		precompute: function(a, b) {
			return a.concat(b)
		}
	},
	floatDot: {
		parameters: ["float", "float"],
		returns: "float",
		plurality: "reduce",
		precompute: function(a, b) {
			return a
				.map(function(item, index){ return item * b[index] })
				.reduce(function(a, b){ return a + b }, 0)
		}
	},
	integerPair: {
		parameters: ["integer", "integer"],
		returns: "integerPair",
		plurality: "map",
		precompute: function(a, b) { return [a, b] }
	},
	integerConditional: {
		parameters: ["boolean", "integerPair"],
		returns: "integer",
		plurality: "map",
		precompute: function(condition, options) { return options[condition ? 0 : 1] }
	},
	integerMultiply: {
		parameters: ["integer", "integer"],
		returns: "integer",
		plurality: "map",
		precompute: function(a, b) { return a * b }
	},
	integerAdd: {
		parameters: ["integer", "integer"],
		returns: "integer",
		plurality: "map",
		precompute: function(a, b) { return a + b }
	},
	integerSubtract: {
		parameters: ["integer", "integer"],
		returns: "integer",
		plurality: "map",
		precompute: function(a, b) { return a - b }
	},
	integerNegate: {
		parameters: ["integer"],
		returns: "integer",
		plurality: "map",
		precompute: function(a) { return -a }
	},
	integerGreaterThan: {
		parameters: ["integer", "integer"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a > b }
	},
	integerLessThan: {
		parameters: ["integer", "integer"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a < b }
	},
	integerEqual: {
		parameters: ["integer", "integer"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a == b }
	},
	integerNotEqual: {
		parameters: ["integer", "integer"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a != b }
	},
	integerGreaterThanOrEqual: {
		parameters: ["integer", "integer"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a >= b }
	},
	integerLessThanOrEqual: {
		parameters: ["integer", "integer"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a <= b }
	},
	integerConcatenate: {
		parameters: ["integer", "integer"],
		returns: "integer",
		plurality: "concatenate",
		precompute: function(a, b) { return a.concat(b) }
	},
	integerDot: {
		parameters: ["integer", "integer"],
		returns: "integer",
		plurality: "reduce",
		precompute: function(a, b) {
			return a
				.map(function(item, index){ return item * b[index] })
				.reduce(function(a, b){ return a + b }, 0)
		}
	},
	booleanPair: {
		parameters: ["boolean", "boolean"],
		returns: "booleanPair",
		plurality: "map",
		precompute: function(a, b) { return [a, b] }
	},
	booleanConditional: {
		parameters: ["boolean", "booleanPair"],
		returns: "boolean",
		plurality: "map",
		precompute: function(condition, options) { return options[condition ? 0 : 1] }
	},
	booleanAnd: {
		parameters: ["boolean", "boolean"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a && b }
	},
	booleanOr: {
		parameters: ["boolean", "boolean"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a, b) { return a || b }
	},
	booleanNot: {
		parameters: ["boolean"],
		returns: "boolean",
		plurality: "map",
		precompute: function(a) { return !a }
	},
	booleanConcatenate: {
		parameters: ["boolean", "boolean"],
		returns: "boolean",
		plurality: "concatenate",
		precompute: function(a, b) { return a.concat(b) }
	}
}

UnaryOperatorPrecedence = ["!", "-"]
BinaryOperatorPrecedence = ["?", ":", "&", "|", ">", "<", ">=", "<=", "==", "!=", ",", "+", "-", "*"]

function ParseTree(str, starts){
	str = str.trim()
	
	function FindAndReturn(arr, cb){
		for(var i = 0; i < arr.length; i++) {
			var temp = cb(arr[i])
			if (temp) return temp
		}
	}
	
	return ParseBooleanTree(str, starts)
		|| ParseIntegerTree(str, starts)
		|| ParseFloatTree(str, starts)
		|| ParseIntegerTree(str, starts)
		|| FindAndReturn(BinaryOperatorPrecedence, function(symbol){ return ParseBinaryTree(str, starts, symbol) })
		|| FindAndReturn(UnaryOperatorPrecedence, function(symbol){ return ParseUnaryTree(str, starts, symbol) })
		|| null
}

function ParseBooleanTree(str){
	switch(str){
		case "true": return {
			constant: "boolean",
			value: true
		}
		case "false": return {
			constant: "boolean",
			value: false			
		}
		default: return null
	}
}

function ParseIntegerTree(str){
	if (!/^\d+$/.test(str)) return null
	return {
		constant: "integer",
		value: parseInt(str)
	}
}

function ParseFloatTree(str){
	if (!/^\d+\.\d+$|^\d+\.$|^\.\d+$/.test(str)) return null
	return {
		constant: "float",
		value: parseFloat(str)
	}
}

function ParseBinaryTree(str, starts, symbol){
	return FindSplittingSymbol(str, starts, symbol, function(lstr, rstr, rstrStarts){
		var ltree = ParseTree(lstr)
		if (!ltree) return null
		var rtree = ParseTree(rstr)
		if (!rtree) return null
		return {
			binary: symbol,
			left: ltree,
			right: rtree
		}
	}, function(){
		return null
	})
}

function ParseUnaryTree(str, starts, symbol){
	return FindSplittingSymbol(str, starts, symbol, function(lstr, rstr, rstrStarts){
		if (lstr.trim() != "") return null
		var rtree = ParseTree(rstr)
		if (!rtree) return null
		return {
			unary: symbol,
			operand: rtree
		}
	}, function(){
		return null
	})
}

BinaryOperatorFunctions = {
	"+": ["integerAdd", "floatAdd"],
	"-": ["integerSubtract", "floatSubtract"],
	"*": ["integerMultiply", "floatMultiply"],
	">": ["integerGreaterThan", "floatGreaterThan"],
	"<": ["integerLessThan", "floatLessThan"],
	">=": ["integerGreaterThanOrEqual"],
	"<=": ["integerLessThanOrEqual"],
	"==": ["integerEqual"],
	"!=": ["integerNotEqual"],
	",": ["booleanConcatenate", "floatConcatenate", "integerConcatenate"],
	"&": ["booleanAnd"],
	"|": ["booleanOr"],
	":": ["booleanPair", "integerPair", "floatPair"],
	"?": ["booleanConditional", "integerConditional", "floatConditional"]
}

UnaryOperatorFunctions = {
	"-": ["integerNegate", "floatNegate"],
	"!": ["booleanNot"]
}

function ParseExpression(tree) {
	if (tree.binary) return ParseFunctionExpression([tree.left, tree.right], BinaryOperatorFunctions[tree.binary])
	if (tree.unary) return ParseFunctionExpression([tree.operand], UnaryOperatorFunctions[tree.unary])
	return tree
}

function ParseFunctionExpression(operandTrees, functionNames) {
	var parsedExpressions = operandTrees.map(ParseExpression)
	if (parsedExpressions.some(function(a){return a == null})) throw {
		reason: "invalidExpression"
	}
	var types = parsedExpressions.map(Type)
	var func = functionNames.find(function(name){
		var parameters = Functions[name].parameters
		if (types.length != parameters.length) return false
		if (types.some(function(a, index){ return a != parameters[index] })) return false
		return true
	})
	if (func == null) throw {
		reason: "noMatchingFunction"
	}
	return {
		call: func,
		with: parsedExpressions
	}
}

function Type(expression) {
	if (expression.call) return Functions[expression.call].returns
	return expression.constant
}

function Plurality(expression) {
	if (expression.call) {
		var pluralities = expression.with.map(Plurality)
		if (Functions[expression.call].plurality == "concatenate") return pluralities.reduce(function(a, b){
			return a + b
		}, 0)
		var greatest = pluralities.reduce(function(a, b){
			return Math.max(a, b)
		}, 1)
		if (pluralities.some(function(a){
			return a > 1 && a < greatest
		})) throw {
			reason: "invalidPlurality"
		}
		if (Functions[expression.call].plurality == "reduce") return 1
		return greatest
	}
	return 1
}