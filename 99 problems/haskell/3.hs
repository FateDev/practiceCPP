kthElement :: [Int] -> Int -> Int
kthElement list k = list !! (k - 1)

main = print (kthElement [1, 2, 3, 4, 5, 6] 2)
