# for x in range(1, 11):
#     for y in range(1, 11):
#         print(x , "*" , y , "=" , x*y , end=" ")
#     print(" ")

# x = input("enter a number")
# print('x=', x)
# y = "am"
# print(y)

# def checkPrime(num):
#     # while 1:
#         # num = input("enter a number")
#         num = int(num)
#         for x in range(2, num):
#             if num%x == 0:
#                 break
#         if x == num-1:
#            return "prime"
#         else:
#             return "not prime"
#         # if num == 0 :
#         #     break
#
# while 1:
#     num = input("enter a number")
#     if num == 0 :
#         break
#     print(checkPrime(num))


# num = input("enter a number")
# num = int(num)
# # while( num < 10):
# #     print("hello")
# #     if 4>5 :
# #         num = num-1
# for x in range(1,101):
#     if x%num != 0 :
#         print(x)

# def factorial(x):
#     """This is a recursive function
#     to find the factorial of an integer"""
#
#     if x == 1:
#         return 1
#     else:
#         return (x * factorial(x-1))
# def

# num = input("enter a number")
# num = int(num)
# # print("The factorial of", num, "is", factorial(num))
# fact = 1
# for x in range(1,num+1):
#     fact = fact * x
# print("The factorial of", num, "is", fact)

# num1 = input("enter a number")
# num1 = int(num1)
# num2 = input("enter a number")
# num2 = int(num2)


def multiply(x,y) :
    if y == 1 :
        return x
    else :
        return (x + multiply(x, y-1))

print("The factorial of" ,multiply(3,4))
