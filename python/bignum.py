def number_input(message):
	isValid = False
	while not isValid:
		userInput = input(message)
		try:
		   val = int(userInput)
		   isValid = True
		except ValueError:
		   print("Error: Not a Number")
		   isValid = False
	return userInput


def string_reverse(string):  
    return string[::-1]

inputNum = number_input('give me a number:')
input1 = input("Input Number 1: ")
input2 = input("Input Number 2: ")

#for i, ch in enumerate(input1):
#	print(ch, '(%d)' %i)
#
#for i in range(len(input2)):
#	print(input2[i], '(%d)' %i)

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
