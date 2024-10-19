secondLastElement :: [Int] -> Int
-- reverse reverse a list, so [1, 2, 3] to [3, 2, 1]
-- tail gives all but the first element, so [3, 2, 1] to [2, 1]
-- head gives the first element of a list, so [2, 1] to 2
secondLastElement = head . tail . reverse

secondLastElement2 :: [Int] -> Int
secondLastElement2 list = reverse list !! 1

main = print (secondLastElement [1, 2, 3, 4], secondLastElement2 [1, 2, 3, 4])
