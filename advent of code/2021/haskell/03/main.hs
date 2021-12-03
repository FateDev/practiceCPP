main = do  
  contents <- readFile "input.txt"
  let nums = map (map toInt) (lines contents)
  let halfNumsLen = ceiling $ fromIntegral(length nums) / 2.0
  let summedNums = foldl1 addLists nums

  let gammaRate = toBinaryNumber $ map (\x -> fromEnum $ halfNumsLen <= x) summedNums
  let epsilonRate = 2^(length $ nums !! 0) - 1 - gammaRate
  putStrLn $ "Part 1: " ++ show (gammaRate * epsilonRate)

  let oxygenRate = toBinaryNumber $ rateAspect Oxygen nums
  let c02Rate = toBinaryNumber $ rateAspect C02 nums
  putStrLn $ "Part 2: " ++ show (oxygenRate * c02Rate)

toInt :: Char -> Int
toInt a = fromEnum a - fromEnum '0'

addLists :: [Int] -> [Int] -> [Int]
addLists (a:as) (b:bs) = (a+b) : addLists as bs
addLists [] bs = bs
addLists as [] = as

toBinaryNumber :: [Int] -> Int
toBinaryNumber digitList
  = binNumHelper digitList (length digitList - 1)
  where
    binNumHelper :: [Int] -> Int -> Int
    binNumHelper (d:ds) num = d*2^num + (binNumHelper ds (num-1))
    binNumHelper [] _ = 0

data RatingType = Oxygen | C02 deriving (Eq)

rateAspect :: RatingType -> [[Int]] -> [Int]
rateAspect _ [] = []
rateAspect rateType lst
  | null (head lst) = []
  | null ones = 0 : (zeros !! 0)
  | null zeros = 1 : (ones !! 0)
  | rateType == Oxygen && length ones >= length zeros = 1 : rateAspect rateType ones
  | rateType == C02 && length ones < length zeros = 1 : rateAspect rateType ones
  | otherwise = 0 : rateAspect rateType zeros
  where
    ones = map tail (filter (\x -> x !! 0 == 1) lst)
    zeros = map tail (filter (\x -> x !! 0 == 0) lst)
