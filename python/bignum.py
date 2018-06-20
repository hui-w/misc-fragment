# Prompt for a number input
def number_input(message):
	isValid = False
	while not isValid:
		userInput = input(message)
		try:
			val = int(userInput)
			for i, ch in enumerate(userInput):
				val = int(ch)
#				print(ch, '(%d)' %i)

#			for i in range(len(userInput)):
#				print(userInput[i], '(%d)' %i)

			isValid = True
		except ValueError:
			print("Error: Not a Number")
			isValid = False
	return userInput


# Reverse the input string
def string_reverse(string):  
    return string[::-1]

input1 = number_input("Input Number 1: ")
input2 = number_input("Input Number 2: ")

# Input two strings and reverse them into tuples
tuple1 = tuple(string_reverse(input1))
tuple2 = tuple(string_reverse(input2))

#print(tuple1, tuple2)

carry = 0
i = 0
resultList = []

while i < len(tuple1) or i < len(tuple2) or carry != 0:
	digit1 = 0
	digit2 = 0

	# Get the first digit on position i if it exists in the tuple 1
	if i < len(tuple1):
		digit1 = int(tuple1[i])

	# Get the second digit on position i if it exists in the tuple 2
	if i < len(tuple2):
		digit2 = int(tuple2[i])

	# The sum of two digits
	sum = digit1 + digit2 + carry

	# Handle the carry value
	if sum >= 10:
		resultList.append(sum % 10)
		carry = 1
	else:
		resultList.append(sum)
		carry = 0

	i += 1

# Reverse the result list and convert into string
reversedList = list(reversed(resultList))
resultString = "".join(map(str, reversedList))

print()
print(input1, "+", input2, "=", resultString)
