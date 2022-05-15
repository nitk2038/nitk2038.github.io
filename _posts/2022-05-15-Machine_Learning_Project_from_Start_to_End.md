---
layout: single
title:  "Machine Learning Project From Start to End"
categories: coding
tag: [blog, python, coding, Machine_Learning, numpy, sklearn]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# Machine Learning Project From Start to End

## Main Procedure

1. see big picture
2. obtain data
3. Explore and visualize to gain insight from data.
4. Preprocess data for machine learning algorithms.
5. select and train data
6. Tune the model precisely.
7. Present the solution.
8. Launch, monitor and maintain the system.

## 1. Working with physical data

- Famous Public Data Repository
    - UC Irvine Machine Learning Repository: [link](http://archive.ics.uci.edu/ml)
    - Kaggle Dataset: [link](http://www.kaggle.com/datasets)
    - Amazon AWS Dataset: [link](https://registry.opendata.aws)
<br><br>
- Meta Potal
    - Data Portals: [link](http://dataportlas.org)
    - Open Data Monitor: [link](http://opendatamonitor.eu)
    - Quandl: [link](http://quandl.com)
<br><br>
- Other pages that list popular public data stores
    - Wiki Machine Learning Dataset List: [link](https://goo.gl/SJHN2K)
    - Quora.com: [link](https://homl.info/10)
    - Dataset Subreddit: [link](http://www.reddit.com/r/datasets)

## 2. See big picture

- given feature: population, median income, etc...
- given label: median housing price
- to predict: The median price of the zone given different measurement data

### 2-1. Define problem

1. define purpose of problem
2. Find Solution
3. Select ML algorithm

### 2-2. Select Performance Metrics

- We're going to use ML modle as a Regression
- RMSE (root mean square error) will be used as a performance indicator.
![img](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/RMSE.png)
- If there are many outliers, a mean absolute error may be considered.
![img](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/mean_absolute_error.png)

### 2-3. assumption examination

- List and examine assumptions made so far.

## 3. Obtain Data

### 3-1. Data Download


```python
import os
import tarfile
import urllib

DOWNLOAD_ROOT = "https://raw.githubusercontent.com/ageron/handson-ml2/master/"
HOUSING_PATH = os.path.join("datasets", "housing")
HOUSING_URL = DOWNLOAD_ROOT + "datasets/housing/housing.tgz"

def fetch_housing_data(housing_url = HOUSING_URL, housing_path = HOUSING_PATH):
    os.makedirs(housing_path, exist_ok = True) #make directory
    tgz_path = os.path.join(housing_path, "housing.tgz") #cd to directory maded
    urllib.request.urlretrieve(housing_url, tgz_path) #download file
    housing_tgz = tarfile.open(tgz_path) #make extracting instance
    housing_tgz.extractall(path = housing_path) #extract all file
    housing_tgz.close() #close instance maded
```

- create a datasets/housing directory in the current workspace
- download the housing.tgz file, and extract it to the same directory to create a housing.csv file.


```python
fetch_housing_data() #call fetch_housing_data()
```

- Call fetch_housing_data()


```python
import pandas as pd

def load_housing_data(housing_path = HOUSING_PATH):
    csv_path = os.path.join(housing_path, "housing.csv") #invoke the csv path
    return pd.read_csv(csv_path) #read csv file
```

- make pandas dataframe instance


```python
housing = load_housing_data()
```

- make pandas dataframe by calling load_housing_data()

### 3-2. Data Structure skim through


```python
housing.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-122.23</td>
      <td>37.88</td>
      <td>41.0</td>
      <td>880.0</td>
      <td>129.0</td>
      <td>322.0</td>
      <td>126.0</td>
      <td>8.3252</td>
      <td>452600.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-122.22</td>
      <td>37.86</td>
      <td>21.0</td>
      <td>7099.0</td>
      <td>1106.0</td>
      <td>2401.0</td>
      <td>1138.0</td>
      <td>8.3014</td>
      <td>358500.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-122.24</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>1467.0</td>
      <td>190.0</td>
      <td>496.0</td>
      <td>177.0</td>
      <td>7.2574</td>
      <td>352100.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-122.25</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>1274.0</td>
      <td>235.0</td>
      <td>558.0</td>
      <td>219.0</td>
      <td>5.6431</td>
      <td>341300.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-122.25</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>1627.0</td>
      <td>280.0</td>
      <td>565.0</td>
      <td>259.0</td>
      <td>3.8462</td>
      <td>342200.0</td>
      <td>NEAR BAY</td>
    </tr>
  </tbody>
</table>
</div>



- print housing.head()


```python
housing.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 20640 entries, 0 to 20639
    Data columns (total 10 columns):
     #   Column              Non-Null Count  Dtype  
    ---  ------              --------------  -----  
     0   longitude           20640 non-null  float64
     1   latitude            20640 non-null  float64
     2   housing_median_age  20640 non-null  float64
     3   total_rooms         20640 non-null  float64
     4   total_bedrooms      20433 non-null  float64
     5   population          20640 non-null  float64
     6   households          20640 non-null  float64
     7   median_income       20640 non-null  float64
     8   median_house_value  20640 non-null  float64
     9   ocean_proximity     20640 non-null  object 
    dtypes: float64(9), object(1)
    memory usage: 1.6+ MB
    

- The info() method is useful for a brief description of the data and identifying the total number of rows and the number of non-null values for each characteristic.


```python
housing.describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20433.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>-119.569704</td>
      <td>35.631861</td>
      <td>28.639486</td>
      <td>2635.763081</td>
      <td>537.870553</td>
      <td>1425.476744</td>
      <td>499.539680</td>
      <td>3.870671</td>
      <td>206855.816909</td>
    </tr>
    <tr>
      <th>std</th>
      <td>2.003532</td>
      <td>2.135952</td>
      <td>12.585558</td>
      <td>2181.615252</td>
      <td>421.385070</td>
      <td>1132.462122</td>
      <td>382.329753</td>
      <td>1.899822</td>
      <td>115395.615874</td>
    </tr>
    <tr>
      <th>min</th>
      <td>-124.350000</td>
      <td>32.540000</td>
      <td>1.000000</td>
      <td>2.000000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>1.000000</td>
      <td>0.499900</td>
      <td>14999.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>-121.800000</td>
      <td>33.930000</td>
      <td>18.000000</td>
      <td>1447.750000</td>
      <td>296.000000</td>
      <td>787.000000</td>
      <td>280.000000</td>
      <td>2.563400</td>
      <td>119600.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>-118.490000</td>
      <td>34.260000</td>
      <td>29.000000</td>
      <td>2127.000000</td>
      <td>435.000000</td>
      <td>1166.000000</td>
      <td>409.000000</td>
      <td>3.534800</td>
      <td>179700.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>-118.010000</td>
      <td>37.710000</td>
      <td>37.000000</td>
      <td>3148.000000</td>
      <td>647.000000</td>
      <td>1725.000000</td>
      <td>605.000000</td>
      <td>4.743250</td>
      <td>264725.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>-114.310000</td>
      <td>41.950000</td>
      <td>52.000000</td>
      <td>39320.000000</td>
      <td>6445.000000</td>
      <td>35682.000000</td>
      <td>6082.000000</td>
      <td>15.000100</td>
      <td>500001.000000</td>
    </tr>
  </tbody>
</table>
</div>



- Describe() mathod shows summary information of numeric characteristics.


```python
%matplotlib inline
import matplotlib.pyplot as plt
housing.hist(bins=50, figsize = (20, 15))
plt.show()
```


    
![png](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/output_30_0.png)
    


- Searching outlier by using histogram

### 3-3. Create Test Set

#### Random Sampling

- Randomly sample the data.


```python
import numpy as np

def split_train_test(data, test_ratio):
    shuffled_indices = np.random.permutation(len(data)) #shuffle index to set dataset
    test_set_size = int(len(data)*test_ratio) #set testset size
    test_indices = shuffled_indices[:test_set_size] #set testset's index
    train_indices = shuffled_indices[test_set_size:] #set trainigset's index
    return data.iloc[train_indices], data.iloc[test_indices] #return dataset result
```


```python
train_set, test_set = split_train_test(housing, 0.2)
```


```python
from zlib import crc32

def test_set_check(identifier, test_ratio): #Only samples less than or equal to 20% of the hash maximum are sent to the test dataset.
    return crc32(np.int64(identifier)) & 0xffffffff < test_ratio * 2 ** 32 #shuffle and split data using hash value

def split_train_test_by_id(data, test_ratio, id_column):
    ids = data[id_column] #save the indices for that colum
    in_test_set = ids.apply(lambda id_: test_set_check(id_, test_ratio)) #apply false value to training data
    return data.loc[~in_test_set], data.loc[in_test_set] #return training data, test data
```


```python
housing_with_id = housing.reset_index() #returns dataframe with added column 'index'
train_set, test_set = split_train_test_by_id(housing_with_id, 0.2, "index")
```


```python
housing_with_id["id"] = housing["longitude"]*1000+housing["latitude"] #set id as a longtitude*1000+latitude value
train_set, test_set = split_train_test_by_id(housing_with_id, 0.2, "id")
```


```python
from sklearn.model_selection import train_test_split
train_set,test_set = train_test_split(housing, test_size = 0.2, random_state = 42)
```

#### Stratified Sampling

- Sampling data by strata.


```python
housing["income_cat"] = pd.cut(housing["median_income"],
                              bins = [0., 1.5, 3.0, 4.5, 6., np.inf],
                              labels = [1, 2, 3, 4, 5]) #Data is divided by category using income
```


```python
housing["income_cat"].hist()
```




    <AxesSubplot:>




    
![png](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/output_44_1.png)
    



```python
from sklearn.model_selection import StratifiedShuffleSplit

split = StratifiedShuffleSplit(n_splits = 1, test_size = 0.2, random_state = 42)
for train_index, test_index in split.split(housing, housing["income_cat"]):
    strat_train_set = housing.loc[train_index] #save training data only in strat_train_set
    strat_test_set = housing.loc[test_index] #save test data only in strat_test_set
```

|parameter name|role|
|:--:|:--:|
|n_splits|int, default = 10<br>분리할 데이터 셋의 갯수를 지정|
|test_size|float, default = None<br>테스트 셋의 비율을 지정|
|train_size|float, default = None<br>훈련 셋의 비율을 지정|
|random_state|int or RandomState instance, default = None<br>생성된 훈련 및 테스트 셋 난수를 지정|


```python
strat_train_set.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>ocean_proximity</th>
      <th>income_cat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12655</th>
      <td>-121.46</td>
      <td>38.52</td>
      <td>29.0</td>
      <td>3873.0</td>
      <td>797.0</td>
      <td>2237.0</td>
      <td>706.0</td>
      <td>2.1736</td>
      <td>72100.0</td>
      <td>INLAND</td>
      <td>2</td>
    </tr>
    <tr>
      <th>15502</th>
      <td>-117.23</td>
      <td>33.09</td>
      <td>7.0</td>
      <td>5320.0</td>
      <td>855.0</td>
      <td>2015.0</td>
      <td>768.0</td>
      <td>6.3373</td>
      <td>279600.0</td>
      <td>NEAR OCEAN</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2908</th>
      <td>-119.04</td>
      <td>35.37</td>
      <td>44.0</td>
      <td>1618.0</td>
      <td>310.0</td>
      <td>667.0</td>
      <td>300.0</td>
      <td>2.8750</td>
      <td>82700.0</td>
      <td>INLAND</td>
      <td>2</td>
    </tr>
    <tr>
      <th>14053</th>
      <td>-117.13</td>
      <td>32.75</td>
      <td>24.0</td>
      <td>1877.0</td>
      <td>519.0</td>
      <td>898.0</td>
      <td>483.0</td>
      <td>2.2264</td>
      <td>112500.0</td>
      <td>NEAR OCEAN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>20496</th>
      <td>-118.70</td>
      <td>34.28</td>
      <td>27.0</td>
      <td>3536.0</td>
      <td>646.0</td>
      <td>1837.0</td>
      <td>580.0</td>
      <td>4.4964</td>
      <td>238300.0</td>
      <td>&lt;1H OCEAN</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>




```python
strat_test_set.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>ocean_proximity</th>
      <th>income_cat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>5241</th>
      <td>-118.39</td>
      <td>34.12</td>
      <td>29.0</td>
      <td>6447.0</td>
      <td>1012.0</td>
      <td>2184.0</td>
      <td>960.0</td>
      <td>8.2816</td>
      <td>500001.0</td>
      <td>&lt;1H OCEAN</td>
      <td>5</td>
    </tr>
    <tr>
      <th>17352</th>
      <td>-120.42</td>
      <td>34.89</td>
      <td>24.0</td>
      <td>2020.0</td>
      <td>307.0</td>
      <td>855.0</td>
      <td>283.0</td>
      <td>5.0099</td>
      <td>162500.0</td>
      <td>&lt;1H OCEAN</td>
      <td>4</td>
    </tr>
    <tr>
      <th>3505</th>
      <td>-118.45</td>
      <td>34.25</td>
      <td>36.0</td>
      <td>1453.0</td>
      <td>270.0</td>
      <td>808.0</td>
      <td>275.0</td>
      <td>4.3839</td>
      <td>204600.0</td>
      <td>&lt;1H OCEAN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>7777</th>
      <td>-118.10</td>
      <td>33.91</td>
      <td>35.0</td>
      <td>1653.0</td>
      <td>325.0</td>
      <td>1072.0</td>
      <td>301.0</td>
      <td>3.2708</td>
      <td>159700.0</td>
      <td>&lt;1H OCEAN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>14155</th>
      <td>-117.07</td>
      <td>32.77</td>
      <td>38.0</td>
      <td>3779.0</td>
      <td>614.0</td>
      <td>1495.0</td>
      <td>614.0</td>
      <td>4.3529</td>
      <td>184000.0</td>
      <td>NEAR OCEAN</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>




```python
strat_test_set["income_cat"].value_counts() / len(strat_test_set)
```




    3    0.350533
    2    0.318798
    4    0.176357
    5    0.114341
    1    0.039971
    Name: income_cat, dtype: float64




```python
for set_ in (strat_train_set, strat_test_set):
    set_.drop("income_cat", axis = 1, inplace=True)
```

## 4. Explore and visualize to gain insight from data

### 4-1. Geographic data visualization


```python
housing = strat_train_set.copy() #Make and use a copy to avoid damaging the training dataset
housing.plot(kind = "scatter", x = "longitude", y = "latitude")
```




    <AxesSubplot:xlabel='longitude', ylabel='latitude'>




    
![png](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/output_53_1.png)
    



```python
housing.plot(kind = "scatter", x = "longitude", y = "latitude", alpha = 0.1)
```




    <AxesSubplot:xlabel='longitude', ylabel='latitude'>




    
![png](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/output_54_1.png)
    


- By specifying the alpha parameter (=0.1), the area where data points are concentrated can be identified.


```python
housing.plot(kind = 'scatter', x = 'longitude', y = 'latitude', alpha = 0.4,
            s = housing["population"]/100, label = "population", figsize = (10, 7),
            c = "median_house_value", cmap=plt.get_cmap("jet"), colorbar=True)
#color means house value
#size means population
```




    <AxesSubplot:xlabel='longitude', ylabel='latitude'>




    
![png](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/output_56_1.png)
    


- As expected, housing prices are highly related to region and population density.

### 4-2. correlation investigation

- The standard correlation coefficient can be calculated through the corr() method.
- The range of coefficient is -1 to 1
- The closer to 1, the more positive the correlation is.
- The closer to -1, the more negative the correlation is.


![img](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/standard_correlation_coefficient_via_dataset.png)


```python
corr_matrix = housing.corr()
corr_matrix
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>longitude</th>
      <td>1.000000</td>
      <td>-0.924478</td>
      <td>-0.105823</td>
      <td>0.048909</td>
      <td>0.076686</td>
      <td>0.108071</td>
      <td>0.063146</td>
      <td>-0.019615</td>
      <td>-0.047466</td>
    </tr>
    <tr>
      <th>latitude</th>
      <td>-0.924478</td>
      <td>1.000000</td>
      <td>0.005737</td>
      <td>-0.039245</td>
      <td>-0.072550</td>
      <td>-0.115290</td>
      <td>-0.077765</td>
      <td>-0.075146</td>
      <td>-0.142673</td>
    </tr>
    <tr>
      <th>housing_median_age</th>
      <td>-0.105823</td>
      <td>0.005737</td>
      <td>1.000000</td>
      <td>-0.364535</td>
      <td>-0.325101</td>
      <td>-0.298737</td>
      <td>-0.306473</td>
      <td>-0.111315</td>
      <td>0.114146</td>
    </tr>
    <tr>
      <th>total_rooms</th>
      <td>0.048909</td>
      <td>-0.039245</td>
      <td>-0.364535</td>
      <td>1.000000</td>
      <td>0.929391</td>
      <td>0.855103</td>
      <td>0.918396</td>
      <td>0.200133</td>
      <td>0.135140</td>
    </tr>
    <tr>
      <th>total_bedrooms</th>
      <td>0.076686</td>
      <td>-0.072550</td>
      <td>-0.325101</td>
      <td>0.929391</td>
      <td>1.000000</td>
      <td>0.876324</td>
      <td>0.980167</td>
      <td>-0.009643</td>
      <td>0.047781</td>
    </tr>
    <tr>
      <th>population</th>
      <td>0.108071</td>
      <td>-0.115290</td>
      <td>-0.298737</td>
      <td>0.855103</td>
      <td>0.876324</td>
      <td>1.000000</td>
      <td>0.904639</td>
      <td>0.002421</td>
      <td>-0.026882</td>
    </tr>
    <tr>
      <th>households</th>
      <td>0.063146</td>
      <td>-0.077765</td>
      <td>-0.306473</td>
      <td>0.918396</td>
      <td>0.980167</td>
      <td>0.904639</td>
      <td>1.000000</td>
      <td>0.010869</td>
      <td>0.064590</td>
    </tr>
    <tr>
      <th>median_income</th>
      <td>-0.019615</td>
      <td>-0.075146</td>
      <td>-0.111315</td>
      <td>0.200133</td>
      <td>-0.009643</td>
      <td>0.002421</td>
      <td>0.010869</td>
      <td>1.000000</td>
      <td>0.687151</td>
    </tr>
    <tr>
      <th>median_house_value</th>
      <td>-0.047466</td>
      <td>-0.142673</td>
      <td>0.114146</td>
      <td>0.135140</td>
      <td>0.047781</td>
      <td>-0.026882</td>
      <td>0.064590</td>
      <td>0.687151</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
from pandas.plotting import scatter_matrix

attributes = ["median_house_value", "median_income", "total_rooms", "housing_median_age"]
scatter_matrix(housing[attributes], figsize = (12, 8))
```




    array([[<AxesSubplot:xlabel='median_house_value', ylabel='median_house_value'>,
            <AxesSubplot:xlabel='median_income', ylabel='median_house_value'>,
            <AxesSubplot:xlabel='total_rooms', ylabel='median_house_value'>,
            <AxesSubplot:xlabel='housing_median_age', ylabel='median_house_value'>],
           [<AxesSubplot:xlabel='median_house_value', ylabel='median_income'>,
            <AxesSubplot:xlabel='median_income', ylabel='median_income'>,
            <AxesSubplot:xlabel='total_rooms', ylabel='median_income'>,
            <AxesSubplot:xlabel='housing_median_age', ylabel='median_income'>],
           [<AxesSubplot:xlabel='median_house_value', ylabel='total_rooms'>,
            <AxesSubplot:xlabel='median_income', ylabel='total_rooms'>,
            <AxesSubplot:xlabel='total_rooms', ylabel='total_rooms'>,
            <AxesSubplot:xlabel='housing_median_age', ylabel='total_rooms'>],
           [<AxesSubplot:xlabel='median_house_value', ylabel='housing_median_age'>,
            <AxesSubplot:xlabel='median_income', ylabel='housing_median_age'>,
            <AxesSubplot:xlabel='total_rooms', ylabel='housing_median_age'>,
            <AxesSubplot:xlabel='housing_median_age', ylabel='housing_median_age'>]],
          dtype=object)




    
![png](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/output_61_1.png)
    



```python
housing.plot(kind="scatter", x = "median_income", y = "median_house_value", alpha = 0.1)
```




    <AxesSubplot:xlabel='median_income', ylabel='median_house_value'>




    
![png](/images/2022-05-15-Machine_Learning_Project_from_Start_to_End/output_62_1.png)
    


### 4-3. Experiment with a combination of properties

- The final process of data processing is to combine several characteristics.


```python
housing["rooms_per_household"] = housing["total_rooms"]/housing["households"]
housing["bedrooms_per_room"] = housing["total_bedrooms"]/housing["total_rooms"]
housing["population_per_household"] = housing["population"]/housing["households"]
```


```python
corr_matrix = housing.corr()
corr_matrix["median_house_value"].sort_values(ascending = False)
```




    median_house_value          1.000000
    median_income               0.687151
    rooms_per_household         0.146255
    total_rooms                 0.135140
    housing_median_age          0.114146
    households                  0.064590
    total_bedrooms              0.047781
    population_per_household   -0.021991
    population                 -0.026882
    longitude                  -0.047466
    latitude                   -0.142673
    bedrooms_per_room          -0.259952
    Name: median_house_value, dtype: float64



## 5. Preprocess data for machine learning algorithms.


```python
housing = strat_train_set.drop("median_house_value", axis = 1) #make instance dropped median_house_value and copy it(feature).
housing_labels = strat_train_set["median_house_value"].copy() #by copying "median_house_value", make label
```

### 5-1. Data purification

- three methods to purify data (deleting NULL data)
    - option 1: delete that row -> dropna()
    - option 2: delete that column -> drop()
    - option 3: fill the value(0, mean, median, etc...) -> fillna()


```python
housing.dropna(subset=["total_bedrooms"]) #option 1
housing.drop("total_bedrooms", axis = 1) #option 2
median = housing["total_bedrooms"].median() #option 3
housing["total_bedrooms"].fillna(median, inplace=True)
```

- Easily handle missing values using SimpleImputer in scikit-learn


```python
from sklearn.impute import SimpleImputer
imputer = SimpleImputer(strategy = "median")
```

- Since median values can only be calculated from numerical properties, we generate copies of the data except for the textual property ocean_proximity.


```python
housing_num = housing.drop("ocean_proximity", axis = 1)
```


```python
imputer.fit(housing_num) #fit data into created instance
```




    SimpleImputer(strategy='median')



- Output the median value of each attribute


```python
imputer.statistics_
```




    array([-118.51   ,   34.26   ,   29.     , 2119.     ,  433.     ,
           1164.     ,  408.     ,    3.54155])




```python
housing_num.median().values
```




    array([-118.51   ,   34.26   ,   29.     , 2119.     ,  433.     ,
           1164.     ,  408.     ,    3.54155])




```python
X = imputer.transform(housing_num) #save transformed data as type np.array
```


```python
housing_tr = pd.DataFrame(X, columns = housing_num.columns,
                         index = housing_num.index) #perfome a type conversion from np.array to pd.DataFrame
```

### 5-2. Dealing with text and categorical attributes


```python
housing_cat = housing[["ocean_proximity"]]
housing_cat.head(10)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12655</th>
      <td>INLAND</td>
    </tr>
    <tr>
      <th>15502</th>
      <td>NEAR OCEAN</td>
    </tr>
    <tr>
      <th>2908</th>
      <td>INLAND</td>
    </tr>
    <tr>
      <th>14053</th>
      <td>NEAR OCEAN</td>
    </tr>
    <tr>
      <th>20496</th>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>1481</th>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>18125</th>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>5830</th>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>17989</th>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>4861</th>
      <td>&lt;1H OCEAN</td>
    </tr>
  </tbody>
</table>
</div>




```python
from sklearn.preprocessing import OrdinalEncoder
ordinal_encoder = OrdinalEncoder() #make OrdinalEncoder() method
housing_cat_encoded = ordinal_encoder.fit_transform(housing_cat) #convert categories from text to numbers
housing_cat_encoded[:10]
```




    array([[1.],
           [4.],
           [1.],
           [4.],
           [0.],
           [3.],
           [0.],
           [0.],
           [0.],
           [0.]])




```python
ordinal_encoder.categories_
```




    [array(['<1H OCEAN', 'INLAND', 'ISLAND', 'NEAR BAY', 'NEAR OCEAN'],
           dtype=object)]



- The problem with the expression method such as the code above is that the machine learning algorithm determines that the two nearby values are more similar than the two separated values.


```python
from sklearn.preprocessing import OneHotEncoder
cat_encoder = OneHotEncoder()
housing_cat_1hot = cat_encoder.fit_transform(housing_cat)
housing_cat_1hot
```




    <16512x5 sparse matrix of type '<class 'numpy.float64'>'
    	with 16512 stored elements in Compressed Sparse Row format>




```python
housing_cat_1hot.toarray()
```




    array([[0., 1., 0., 0., 0.],
           [0., 0., 0., 0., 1.],
           [0., 1., 0., 0., 0.],
           ...,
           [1., 0., 0., 0., 0.],
           [1., 0., 0., 0., 0.],
           [0., 1., 0., 0., 0.]])



- It is called one-hot-encoding that produces a matrix (to be exact, a spare matrix) in which only one property is 1 and the other is 0.
- One-hot-encoding can solve the problem that occurs above.


```python
cat_encoder.categories_
```




    [array(['<1H OCEAN', 'INLAND', 'ISLAND', 'NEAR BAY', 'NEAR OCEAN'],
           dtype=object)]



### 5-3. my own encoder

- Since scikit-learn supports duck typing, you can create a class that implements the fit(), transform(), and fit_transform() methods.
- The last method(fit_transform()) is automatically generated when TransformerMixin is inherited.
- Inheriting BaseEstimator gives you two additional methods (get_params() and set_params()) required for hyperparameter tuning.


```python
from sklearn.base import BaseEstimator, TransformerMixin

rooms_ix, bedrooms_ix, population_ix, households_ix = 3, 4, 5, 6

class CombinedAttributesAdder(BaseEstimator, TransformerMixin): #class declaration, class name, class to inherit
    def __init__(self, add_bedrooms_per_room = True): #constructor
        self.add_bedrooms_per_room = add_bedrooms_per_room
    
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        rooms_per_household = X[:, rooms_ix] / X[:, households_ix]
        population_per_household = X[:, population_ix] / X[:, households_ix]
        if self.add_bedrooms_per_room:
            bedrooms_per_room = X[:, population_ix] / X[:, rooms_ix]
            return np.c_[X, rooms_per_household, population_per_household,
                        bedrooms_per_room]
        else:
            return np.c_[X, rooms_per_household, population_per_household]
```


```python
attr_adder = CombinedAttributesAdder(add_bedrooms_per_room = False)
housing_extra_attribs = attr_adder.transform(housing.values)
```

### 5-4. Feature Scaling

- min-max scaling(normalization): If the minimum value is subtracted from the data and divided by the difference between the maximum value and the minimum value, it can have a value in the range of 0 to 1.
    - scikit-learn method: MinMaxScaler
    - If yoiu don't want between 0 ~ 1, you can specify a range with the feature_range parameter.
- standardization: Subtract the mean and divide it by the standard deviation so that the variance of the result distribution is 1.
    - scikit-learn method: StandardScaler
    - weakness: There are no upper or lower limits of the range in standardization.
    - strength: Less influenced by outlier.

### 5-5. Tramsform Pipeline

- In scikit-learn, there is a pipeline class that helps you process successive transformations in order.


```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy = 'median')), #impute median value to missing value
    ('attribs_adder', CombinedAttributesAdder()), #attribute combined data
    ('std_scaler', StandardScaler()) # use scaler as a StandardSclaer()
])
```


```python
housing_num_tr = num_pipeline.fit_transform(housing_num)
```

- Using the column transformer of scikit-learn, appropriate transformations can be applied for each column.


```python
from sklearn.compose import ColumnTransformer

num_attribs = list(housing_num) #column names of housing_num
cat_attribs = ["ocean_proximity"]

full_pipeline = ColumnTransformer([
    ("num", num_pipeline, num_attribs), #numerical columns, method to use, column name
    ("cat", OneHotEncoder(), cat_attribs) #categorical columns, method to use, column name
])
```


```python
housing_prepared = full_pipeline.fit_transform(housing)
```

## 6. Model Selection and Training

### 6-1. Training and evaluation in the training set


```python
from sklearn.linear_model import LinearRegression

lin_reg = LinearRegression()
lin_reg.fit(housing_prepared, housing_labels)
```




    LinearRegression()




```python
some_data = housing.iloc[:5]
some_labels = housing_labels.iloc[:5]
some_data_prepared = full_pipeline.transform(some_data)
print("예측:", lin_reg.predict(some_data_prepared))
print("레이블:", list(some_labels))
```

    예측: [ 88333.09379412 304123.62735521 154187.05347464 183840.76954194
     247421.15200237]
    레이블: [72100.0, 279600.0, 82700.0, 112500.0, 238300.0]
    


```python
from sklearn.metrics import mean_squared_error

housing_predictions = lin_reg.predict(housing_prepared)
lin_mse = mean_squared_error(housing_labels, housing_predictions)
lin_rmse = np.sqrt(lin_mse)
lin_rmse
```




    68898.1375370648




```python
from sklearn.tree import DecisionTreeRegressor

tree_reg = DecisionTreeRegressor()
tree_reg.fit(housing_prepared, housing_labels)
```




    DecisionTreeRegressor()




```python
housing_predictions = tree_reg.predict(housing_prepared)
tree_mse = mean_squared_error(housing_labels, housing_predictions)
tree_rmse = np.sqrt(tree_mse)
tree_rmse
```




    0.0



### 6-2. Evaluation using cross-validation (K-fold cross-validation)


```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(tree_reg, housing_prepared, housing_labels,
                        scoring = "neg_mean_squared_error", cv = 10)
tree_rmse_scores = np.sqrt(-scores)
```


```python
def display_scores(scores):
    print("점수:", scores)
    print("평균:", scores.mean())
    print("표준편차:", scores.std())
```


```python
display_scores(tree_rmse_scores) #Decision Tree Regressor Cross ValueScore
```

    점수: [69967.3008089  68004.88688671 67430.74076444 68247.0170099
     66218.82800129 76653.06092979 70273.66771328 71975.20626109
     69834.44957085 70946.32865859]
    평균: 69955.14866048493
    표준편차: 2776.602809433244
    


```python
lin_scores = cross_val_score(lin_reg, housing_prepared, housing_labels,
                            scoring = "neg_mean_squared_error", cv = 10)
lin_rmse_scores = np.sqrt(-lin_scores)
```


```python
display_scores(lin_rmse_scores) #Linear Regression Cross Value Score
```

    점수: [72388.64937198 64547.9887793  68170.84810636 69123.05064823
     66882.20628954 73022.80595635 70535.54365056 69461.22422101
     66950.1167962  70520.49977901]
    평균: 69160.29335985384
    표준편차: 2479.952095557169
    


```python
from sklearn.ensemble import RandomForestRegressor

forest_reg = RandomForestRegressor()
forest_reg.fit(housing_prepared, housing_labels)
forest_scores = cross_val_score(forest_reg, housing_prepared, housing_labels,
                               scoring = "neg_mean_squared_error", cv = 10)
forest_rmse_scores = np.sqrt(-forest_scores)
```


```python
display_scores(forest_rmse_scores) #Random Forest Regressor Cross Value Score
```

    점수: [50593.38015823 48208.73130493 46344.77770771 50743.70102855
     47398.81788339 51073.11958995 51050.84228667 49141.6114608
     47491.92417469 53549.78256551]
    평균: 49559.668816044265
    표준편차: 2102.041967281656
    

## 7. model detail tuning

### 7-1. Grid Search

- Specify the value to try with GridSearchCV.
- Try the specified value using GridSearchCV.


```python
from sklearn.model_selection import GridSearchCV

param_grid = [
    {'n_estimators' : [3, 10, 30], 'max_features' : [2, 4, 6, 8]},
    {'bootstrap' : [False], 'n_estimators' : [3, 10], 'max_features' : [2, 3, 4]}
]

forest_reg = RandomForestRegressor() 

grid_search = GridSearchCV(forest_reg, param_grid, cv = 5,
                          scoring = 'neg_mean_squared_error',
                          return_train_score=True) #parameter: model, hyper parameters, number of test sets to cross validate

grid_search.fit(housing_prepared, housing_labels)
```




    GridSearchCV(cv=5, estimator=RandomForestRegressor(),
                 param_grid=[{'max_features': [2, 4, 6, 8],
                              'n_estimators': [3, 10, 30]},
                             {'bootstrap': [False], 'max_features': [2, 3, 4],
                              'n_estimators': [3, 10]}],
                 return_train_score=True, scoring='neg_mean_squared_error')




```python
grid_search.best_params_
```




    {'max_features': 8, 'n_estimators': 30}




```python
cvres = grid_search.cv_results_
for mean_score, params in zip(cvres["mean_test_score"], cvres["params"]):
    print(np.sqrt(-mean_score), params)
```

    63553.50282430159 {'max_features': 2, 'n_estimators': 3}
    55261.23459140959 {'max_features': 2, 'n_estimators': 10}
    52789.841645765286 {'max_features': 2, 'n_estimators': 30}
    60919.025910102755 {'max_features': 4, 'n_estimators': 3}
    52837.82934145696 {'max_features': 4, 'n_estimators': 10}
    50611.53030949335 {'max_features': 4, 'n_estimators': 30}
    58417.254472109445 {'max_features': 6, 'n_estimators': 3}
    52746.63921183428 {'max_features': 6, 'n_estimators': 10}
    49907.1647444693 {'max_features': 6, 'n_estimators': 30}
    59128.46505172482 {'max_features': 8, 'n_estimators': 3}
    51898.661279023574 {'max_features': 8, 'n_estimators': 10}
    49890.14032326826 {'max_features': 8, 'n_estimators': 30}
    62251.68123224137 {'bootstrap': False, 'max_features': 2, 'n_estimators': 3}
    53916.51246133781 {'bootstrap': False, 'max_features': 2, 'n_estimators': 10}
    60120.30675843337 {'bootstrap': False, 'max_features': 3, 'n_estimators': 3}
    52366.455890190526 {'bootstrap': False, 'max_features': 3, 'n_estimators': 10}
    58273.895865390245 {'bootstrap': False, 'max_features': 4, 'n_estimators': 3}
    51866.47528342506 {'bootstrap': False, 'max_features': 4, 'n_estimators': 10}
    

### 7-2. Random Search

- Grid search is good when exploring a relatively small number of combinations.
- As the hyperparameter search space increases, it is better to use Randomized Search CV.
- Recommended if the hyperparameter value is continuous.

### 7-3. Ensemble method

- Connecting and using the best model

### 7-4. best model and error analysis

- Analyzing the best models often yields good insights into the problem.


```python
feature_importances = grid_search.best_estimator_.feature_importances_
feature_importances
```




    array([7.84842666e-02, 7.11153847e-02, 3.68891440e-02, 1.43944149e-02,
           1.43023446e-02, 1.41952412e-02, 1.39962397e-02, 3.14561615e-01,
           3.86697957e-02, 6.45056686e-02, 1.42912982e-01, 1.06080894e-02,
           1.79901725e-01, 7.59267898e-05, 2.72471468e-03, 2.66244692e-03])




```python
extra_attribs = ['rooms_per_hhold', 'pop_per_hhold', 'bedrooms_per_room']
cat_encoder = full_pipeline.named_transformers_['cat']
cat_one_hot_attribs = list(cat_encoder.categories_[0])
attributes = num_attribs + extra_attribs + cat_one_hot_attribs
sorted(zip(feature_importances, attributes), reverse = True)
```




    [(0.31456161502739627, 'median_income'),
     (0.1799017252748666, 'INLAND'),
     (0.14291298169832262, 'bedrooms_per_room'),
     (0.07848426661873172, 'longitude'),
     (0.07111538470353376, 'latitude'),
     (0.06450566858909969, 'pop_per_hhold'),
     (0.03866979574426207, 'rooms_per_hhold'),
     (0.036889144026982644, 'housing_median_age'),
     (0.014394414942483887, 'total_rooms'),
     (0.014302344583291689, 'total_bedrooms'),
     (0.014195241231232099, 'population'),
     (0.013996239726464525, 'households'),
     (0.010608089440765472, '<1H OCEAN'),
     (0.002724714682462037, 'NEAR BAY'),
     (0.0026624469203033467, 'NEAR OCEAN'),
     (7.592678980155106e-05, 'ISLAND')]



### evaluate system using test set


```python
final_model = grid_search.best_estimator_

X_test = strat_test_set.drop("median_house_value", axis = 1)
y_test = strat_test_set["median_house_value"].copy()

X_test_prepared = full_pipeline.transform(X_test)

final_predictions = final_model.predict(X_test_prepared)

final_mse = mean_squared_error(y_test, final_predictions)
final_rmse = np.sqrt(final_mse)
```


```python
from scipy import stats
confidence = 0.95
squared_errors = (final_predictions - y_test) ** 2 #squared deviations
np.sqrt(stats.t.interval(confidence, len(squared_errors) - 1,
                        loc = squared_errors.mean(),
                        scale = stats.sem(squared_errors))) #confidence, length of dataset, variation, squared deviation's standard error
```




    array([45587.31832624, 49504.99631088])



## 8. Launching, Monitoring, System maintenance

### 8-1. Launching

- A trained model containing the entire preprocessing pipeline and the prediction pipeline is loaded in a commercial environment and the predict() method is called to make a prediction.
    - joblib
    - REST API
    - Google Cloud AI platform

### 8-2. Monitoring, System maintenance

- Collect and label new data regularly.
- Train the model and write a script that automatically fine-tune the hyperparameter.
- Write a script to compare the old model with the new model.

## 9. Practice Problem

### 1. Find the best SVR model by changing the hyperparameters of the SVR.


```python
from sklearn.svm import SVR

sv_reg_linear = SVR(kernel = "linear")
sv_reg_linear.fit(housing_prepared, housing_labels)
```




    SVR(kernel='linear')




```python
from sklearn.svm import SVR

sv_reg_sigmoid = SVR(kernel = "sigmoid")
sv_reg_sigmoid.fit(housing_prepared, housing_labels)
```




    SVR(kernel='sigmoid')




```python
from sklearn.svm import SVR

sv_reg_poly = SVR(kernel = "poly")
sv_reg_poly.fit(housing_prepared, housing_labels)
```




    SVR(kernel='poly')




```python
from sklearn.svm import SVR

sv_reg_rbf = SVR(kernel = "rbf")
sv_reg_rbf.fit(housing_prepared, housing_labels)
```




    SVR()




```python
lin_score = cross_val_score(sv_reg_linear, housing_prepared, housing_labels,
                        scoring = "neg_mean_squared_error", cv = 10)

lin_rmse_scores = np.sqrt(-lin_score)

display_scores(lin_rmse_scores)
```

    점수: [110904.46855402 113424.11067613 107410.11303116 114051.38003247
     108258.39326036 116489.30535273 113697.78254224 112249.38702556
     113622.37215992 112478.62616749]
    평균: 112258.59388020856
    표준편차: 2603.730252338954
    


```python
sigmoid_score = cross_val_score(sv_reg_sigmoid, housing_prepared, housing_labels,
                        scoring = "neg_mean_squared_error", cv = 10)

sigmoid_rmse_scores = np.sqrt(-sigmoid_score)

display_scores(sigmoid_rmse_scores)
```

    점수: [116553.05284116 119920.75438968 113731.06877267 120179.67427858
     114410.87472723 122567.53880617 119656.65508908 118119.83987113
     120042.24106716 118633.39582652]
    평균: 118381.50956693811
    표준편차: 2614.904382413015
    


```python
poly_score = cross_val_score(sv_reg_poly, housing_prepared, housing_labels,
                        scoring = "neg_mean_squared_error", cv = 10)

poly_rmse_scores = np.sqrt(-poly_score)

display_scores(poly_rmse_scores)
```

    점수: [116685.90328589 120174.28230988 114209.86263405 120645.77740161
     244069.04900992 122770.45695753 119714.46383621 118499.60711274
     120201.5552929  118876.36663856]
    평균: 131584.73244792808
    표준편차: 37559.73417342793
    


```python
rbf_score = cross_val_score(sv_reg_rbf, housing_prepared, housing_labels,
                        scoring = "neg_mean_squared_error", cv = 10)

rbf_rmse_scores = np.sqrt(-rbf_score)

display_scores(rbf_rmse_scores)
```

    점수: [116729.22167717 120108.99110971 113930.02118382 120386.18753814
     114685.44613307 122779.35328434 119838.4085899  118277.63898618
     120230.75303087 118830.48858763]
    평균: 118579.6510120817
    표준편차: 2606.0059804641173
    


```python
param_grid = [
        {'kernel': ['linear'], 'C': [10., 30., 100., 300., 1000., 3000., 10000., 30000.0]},
        {'kernel': ['rbf'], 'C': [1.0, 3.0, 10., 30., 100., 300., 1000.0],
         'gamma': [0.01, 0.03, 0.1, 0.3, 1.0, 3.0]},
    ]

svm_reg = SVR()
svm_grid_search = GridSearchCV(svm_reg, param_grid, cv = 5, scoring = 'neg_mean_squared_error', verbose=2)
svm_grid_search.fit(housing_prepared, housing_labels)
```

    Fitting 5 folds for each of 50 candidates, totalling 250 fits
    [CV] END ..............................C=10.0, kernel=linear; total time=   9.1s
    [CV] END ..............................C=10.0, kernel=linear; total time=   8.6s
    [CV] END ..............................C=10.0, kernel=linear; total time=   9.0s
    [CV] END ..............................C=10.0, kernel=linear; total time=   8.4s
    [CV] END ..............................C=10.0, kernel=linear; total time=   8.7s
    [CV] END ..............................C=30.0, kernel=linear; total time=   8.5s
    [CV] END ..............................C=30.0, kernel=linear; total time=   8.1s
    [CV] END ..............................C=30.0, kernel=linear; total time=   8.3s
    [CV] END ..............................C=30.0, kernel=linear; total time=   9.1s
    [CV] END ..............................C=30.0, kernel=linear; total time=   8.5s
    [CV] END .............................C=100.0, kernel=linear; total time=   8.6s
    [CV] END .............................C=100.0, kernel=linear; total time=   8.5s
    [CV] END .............................C=100.0, kernel=linear; total time=   8.6s
    [CV] END .............................C=100.0, kernel=linear; total time=   8.8s
    [CV] END .............................C=100.0, kernel=linear; total time=   8.1s
    [CV] END .............................C=300.0, kernel=linear; total time=   7.9s
    [CV] END .............................C=300.0, kernel=linear; total time=   7.5s
    [CV] END .............................C=300.0, kernel=linear; total time=   7.4s
    [CV] END .............................C=300.0, kernel=linear; total time=   9.1s
    [CV] END .............................C=300.0, kernel=linear; total time=   8.2s
    [CV] END ............................C=1000.0, kernel=linear; total time=   7.6s
    [CV] END ............................C=1000.0, kernel=linear; total time=   8.5s
    [CV] END ............................C=1000.0, kernel=linear; total time=   8.2s
    [CV] END ............................C=1000.0, kernel=linear; total time=   8.5s
    [CV] END ............................C=1000.0, kernel=linear; total time=   8.9s
    [CV] END ............................C=3000.0, kernel=linear; total time=   9.4s
    [CV] END ............................C=3000.0, kernel=linear; total time=   9.2s
    [CV] END ............................C=3000.0, kernel=linear; total time=  10.0s
    [CV] END ............................C=3000.0, kernel=linear; total time=   9.9s
    [CV] END ............................C=3000.0, kernel=linear; total time=   8.5s
    [CV] END ...........................C=10000.0, kernel=linear; total time=   9.7s
    [CV] END ...........................C=10000.0, kernel=linear; total time=  11.5s
    [CV] END ...........................C=10000.0, kernel=linear; total time=  10.5s
    [CV] END ...........................C=10000.0, kernel=linear; total time=  11.0s
    [CV] END ...........................C=10000.0, kernel=linear; total time=  11.5s
    [CV] END ...........................C=30000.0, kernel=linear; total time=  17.1s
    [CV] END ...........................C=30000.0, kernel=linear; total time=  16.6s
    [CV] END ...........................C=30000.0, kernel=linear; total time=  16.6s
    [CV] END ...........................C=30000.0, kernel=linear; total time=  13.6s
    [CV] END ...........................C=30000.0, kernel=linear; total time=  16.7s
    [CV] END ......................C=1.0, gamma=0.01, kernel=rbf; total time=  16.3s
    [CV] END ......................C=1.0, gamma=0.01, kernel=rbf; total time=  18.9s
    [CV] END ......................C=1.0, gamma=0.01, kernel=rbf; total time=  15.8s
    [CV] END ......................C=1.0, gamma=0.01, kernel=rbf; total time=  15.5s
    [CV] END ......................C=1.0, gamma=0.01, kernel=rbf; total time=  16.0s
    [CV] END ......................C=1.0, gamma=0.03, kernel=rbf; total time=  15.8s
    [CV] END ......................C=1.0, gamma=0.03, kernel=rbf; total time=  15.7s
    [CV] END ......................C=1.0, gamma=0.03, kernel=rbf; total time=  16.9s
    [CV] END ......................C=1.0, gamma=0.03, kernel=rbf; total time=  15.8s
    [CV] END ......................C=1.0, gamma=0.03, kernel=rbf; total time=  15.7s
    [CV] END .......................C=1.0, gamma=0.1, kernel=rbf; total time=  16.2s
    [CV] END .......................C=1.0, gamma=0.1, kernel=rbf; total time=  16.1s
    [CV] END .......................C=1.0, gamma=0.1, kernel=rbf; total time=  15.3s
    [CV] END .......................C=1.0, gamma=0.1, kernel=rbf; total time=  16.7s
    [CV] END .......................C=1.0, gamma=0.1, kernel=rbf; total time=  17.0s
    [CV] END .......................C=1.0, gamma=0.3, kernel=rbf; total time=  15.5s
    [CV] END .......................C=1.0, gamma=0.3, kernel=rbf; total time=  16.1s
    [CV] END .......................C=1.0, gamma=0.3, kernel=rbf; total time=  16.7s
    [CV] END .......................C=1.0, gamma=0.3, kernel=rbf; total time=  16.1s
    [CV] END .......................C=1.0, gamma=0.3, kernel=rbf; total time=  15.9s
    [CV] END .......................C=1.0, gamma=1.0, kernel=rbf; total time=  18.3s
    [CV] END .......................C=1.0, gamma=1.0, kernel=rbf; total time=  15.0s
    [CV] END .......................C=1.0, gamma=1.0, kernel=rbf; total time=  15.1s
    [CV] END .......................C=1.0, gamma=1.0, kernel=rbf; total time=  16.1s
    [CV] END .......................C=1.0, gamma=1.0, kernel=rbf; total time=  19.5s
    [CV] END .......................C=1.0, gamma=3.0, kernel=rbf; total time=  19.5s
    [CV] END .......................C=1.0, gamma=3.0, kernel=rbf; total time=  16.4s
    [CV] END .......................C=1.0, gamma=3.0, kernel=rbf; total time=  16.8s
    [CV] END .......................C=1.0, gamma=3.0, kernel=rbf; total time=  15.5s
    [CV] END .......................C=1.0, gamma=3.0, kernel=rbf; total time=  16.2s
    [CV] END ......................C=3.0, gamma=0.01, kernel=rbf; total time=  17.0s
    [CV] END ......................C=3.0, gamma=0.01, kernel=rbf; total time=  16.8s
    [CV] END ......................C=3.0, gamma=0.01, kernel=rbf; total time=  17.7s
    [CV] END ......................C=3.0, gamma=0.01, kernel=rbf; total time=  16.7s
    [CV] END ......................C=3.0, gamma=0.01, kernel=rbf; total time=  17.0s
    [CV] END ......................C=3.0, gamma=0.03, kernel=rbf; total time=  16.5s
    [CV] END ......................C=3.0, gamma=0.03, kernel=rbf; total time=  17.1s
    [CV] END ......................C=3.0, gamma=0.03, kernel=rbf; total time=  17.8s
    [CV] END ......................C=3.0, gamma=0.03, kernel=rbf; total time=  16.7s
    [CV] END ......................C=3.0, gamma=0.03, kernel=rbf; total time=  17.2s
    [CV] END .......................C=3.0, gamma=0.1, kernel=rbf; total time=  20.2s
    [CV] END .......................C=3.0, gamma=0.1, kernel=rbf; total time=  17.7s
    [CV] END .......................C=3.0, gamma=0.1, kernel=rbf; total time=  15.7s
    [CV] END .......................C=3.0, gamma=0.1, kernel=rbf; total time=  16.3s
    [CV] END .......................C=3.0, gamma=0.1, kernel=rbf; total time=  16.0s
    [CV] END .......................C=3.0, gamma=0.3, kernel=rbf; total time=  16.0s
    [CV] END .......................C=3.0, gamma=0.3, kernel=rbf; total time=  15.5s
    [CV] END .......................C=3.0, gamma=0.3, kernel=rbf; total time=  14.9s
    [CV] END .......................C=3.0, gamma=0.3, kernel=rbf; total time=  15.5s
    [CV] END .......................C=3.0, gamma=0.3, kernel=rbf; total time=  16.0s
    [CV] END .......................C=3.0, gamma=1.0, kernel=rbf; total time=  15.3s
    [CV] END .......................C=3.0, gamma=1.0, kernel=rbf; total time=  15.1s
    [CV] END .......................C=3.0, gamma=1.0, kernel=rbf; total time=  14.5s
    [CV] END .......................C=3.0, gamma=1.0, kernel=rbf; total time=  15.0s
    [CV] END .......................C=3.0, gamma=1.0, kernel=rbf; total time=  15.9s
    [CV] END .......................C=3.0, gamma=3.0, kernel=rbf; total time=  16.8s
    [CV] END .......................C=3.0, gamma=3.0, kernel=rbf; total time=  16.0s
    [CV] END .......................C=3.0, gamma=3.0, kernel=rbf; total time=  16.4s
    [CV] END .......................C=3.0, gamma=3.0, kernel=rbf; total time=  16.6s
    [CV] END .......................C=3.0, gamma=3.0, kernel=rbf; total time=  15.2s
    [CV] END .....................C=10.0, gamma=0.01, kernel=rbf; total time=  15.4s
    [CV] END .....................C=10.0, gamma=0.01, kernel=rbf; total time=  16.2s
    [CV] END .....................C=10.0, gamma=0.01, kernel=rbf; total time=  16.2s
    [CV] END .....................C=10.0, gamma=0.01, kernel=rbf; total time=  15.7s
    [CV] END .....................C=10.0, gamma=0.01, kernel=rbf; total time=  15.6s
    [CV] END .....................C=10.0, gamma=0.03, kernel=rbf; total time=  15.3s
    [CV] END .....................C=10.0, gamma=0.03, kernel=rbf; total time=  15.2s
    [CV] END .....................C=10.0, gamma=0.03, kernel=rbf; total time=  16.3s
    [CV] END .....................C=10.0, gamma=0.03, kernel=rbf; total time=  16.0s
    [CV] END .....................C=10.0, gamma=0.03, kernel=rbf; total time=  15.3s
    [CV] END ......................C=10.0, gamma=0.1, kernel=rbf; total time=  16.6s
    [CV] END ......................C=10.0, gamma=0.1, kernel=rbf; total time=  15.3s
    [CV] END ......................C=10.0, gamma=0.1, kernel=rbf; total time=  15.8s
    [CV] END ......................C=10.0, gamma=0.1, kernel=rbf; total time=  17.0s
    [CV] END ......................C=10.0, gamma=0.1, kernel=rbf; total time=  18.4s
    [CV] END ......................C=10.0, gamma=0.3, kernel=rbf; total time=  17.9s
    [CV] END ......................C=10.0, gamma=0.3, kernel=rbf; total time=  15.1s
    [CV] END ......................C=10.0, gamma=0.3, kernel=rbf; total time=  16.0s
    [CV] END ......................C=10.0, gamma=0.3, kernel=rbf; total time=  15.7s
    [CV] END ......................C=10.0, gamma=0.3, kernel=rbf; total time=  16.7s
    [CV] END ......................C=10.0, gamma=1.0, kernel=rbf; total time=  16.4s
    [CV] END ......................C=10.0, gamma=1.0, kernel=rbf; total time=  15.4s
    [CV] END ......................C=10.0, gamma=1.0, kernel=rbf; total time=  16.4s
    [CV] END ......................C=10.0, gamma=1.0, kernel=rbf; total time=  15.9s
    [CV] END ......................C=10.0, gamma=1.0, kernel=rbf; total time=  14.9s
    [CV] END ......................C=10.0, gamma=3.0, kernel=rbf; total time=  15.3s
    [CV] END ......................C=10.0, gamma=3.0, kernel=rbf; total time=  15.6s
    [CV] END ......................C=10.0, gamma=3.0, kernel=rbf; total time=  16.9s
    [CV] END ......................C=10.0, gamma=3.0, kernel=rbf; total time=  15.7s
    [CV] END ......................C=10.0, gamma=3.0, kernel=rbf; total time=  15.7s
    [CV] END .....................C=30.0, gamma=0.01, kernel=rbf; total time=  17.0s
    [CV] END .....................C=30.0, gamma=0.01, kernel=rbf; total time=  16.7s
    [CV] END .....................C=30.0, gamma=0.01, kernel=rbf; total time=  18.2s
    [CV] END .....................C=30.0, gamma=0.01, kernel=rbf; total time=  17.9s
    [CV] END .....................C=30.0, gamma=0.01, kernel=rbf; total time=  17.6s
    [CV] END .....................C=30.0, gamma=0.03, kernel=rbf; total time=  17.1s
    [CV] END .....................C=30.0, gamma=0.03, kernel=rbf; total time=  17.7s
    [CV] END .....................C=30.0, gamma=0.03, kernel=rbf; total time=  17.9s
    [CV] END .....................C=30.0, gamma=0.03, kernel=rbf; total time=  17.9s
    [CV] END .....................C=30.0, gamma=0.03, kernel=rbf; total time=  17.0s
    [CV] END ......................C=30.0, gamma=0.1, kernel=rbf; total time=  17.2s
    [CV] END ......................C=30.0, gamma=0.1, kernel=rbf; total time=  18.1s
    [CV] END ......................C=30.0, gamma=0.1, kernel=rbf; total time=  17.6s
    [CV] END ......................C=30.0, gamma=0.1, kernel=rbf; total time=  17.3s
    [CV] END ......................C=30.0, gamma=0.1, kernel=rbf; total time=  17.2s
    [CV] END ......................C=30.0, gamma=0.3, kernel=rbf; total time=  16.6s
    [CV] END ......................C=30.0, gamma=0.3, kernel=rbf; total time=  16.8s
    [CV] END ......................C=30.0, gamma=0.3, kernel=rbf; total time=  17.2s
    [CV] END ......................C=30.0, gamma=0.3, kernel=rbf; total time=  17.3s
    [CV] END ......................C=30.0, gamma=0.3, kernel=rbf; total time=  17.1s
    [CV] END ......................C=30.0, gamma=1.0, kernel=rbf; total time=  18.6s
    [CV] END ......................C=30.0, gamma=1.0, kernel=rbf; total time=  17.6s
    [CV] END ......................C=30.0, gamma=1.0, kernel=rbf; total time=  16.5s
    [CV] END ......................C=30.0, gamma=1.0, kernel=rbf; total time=  16.2s
    [CV] END ......................C=30.0, gamma=1.0, kernel=rbf; total time=  17.7s
    [CV] END ......................C=30.0, gamma=3.0, kernel=rbf; total time=  18.3s
    [CV] END ......................C=30.0, gamma=3.0, kernel=rbf; total time=  18.7s
    [CV] END ......................C=30.0, gamma=3.0, kernel=rbf; total time=  17.4s
    [CV] END ......................C=30.0, gamma=3.0, kernel=rbf; total time=  18.0s
    [CV] END ......................C=30.0, gamma=3.0, kernel=rbf; total time=  17.7s
    [CV] END ....................C=100.0, gamma=0.01, kernel=rbf; total time=  17.8s
    [CV] END ....................C=100.0, gamma=0.01, kernel=rbf; total time=  16.4s
    [CV] END ....................C=100.0, gamma=0.01, kernel=rbf; total time=  16.8s
    [CV] END ....................C=100.0, gamma=0.01, kernel=rbf; total time=  16.9s
    [CV] END ....................C=100.0, gamma=0.01, kernel=rbf; total time=  17.9s
    [CV] END ....................C=100.0, gamma=0.03, kernel=rbf; total time=  17.2s
    [CV] END ....................C=100.0, gamma=0.03, kernel=rbf; total time=  16.1s
    [CV] END ....................C=100.0, gamma=0.03, kernel=rbf; total time=  17.9s
    [CV] END ....................C=100.0, gamma=0.03, kernel=rbf; total time=  16.5s
    [CV] END ....................C=100.0, gamma=0.03, kernel=rbf; total time=  16.4s
    [CV] END .....................C=100.0, gamma=0.1, kernel=rbf; total time=  18.1s
    [CV] END .....................C=100.0, gamma=0.1, kernel=rbf; total time=  17.3s
    [CV] END .....................C=100.0, gamma=0.1, kernel=rbf; total time=  17.8s
    [CV] END .....................C=100.0, gamma=0.1, kernel=rbf; total time=  16.4s
    [CV] END .....................C=100.0, gamma=0.1, kernel=rbf; total time=  16.2s
    [CV] END .....................C=100.0, gamma=0.3, kernel=rbf; total time=  18.1s
    [CV] END .....................C=100.0, gamma=0.3, kernel=rbf; total time=  18.0s
    [CV] END .....................C=100.0, gamma=0.3, kernel=rbf; total time=  15.9s
    [CV] END .....................C=100.0, gamma=0.3, kernel=rbf; total time=  15.9s
    [CV] END .....................C=100.0, gamma=0.3, kernel=rbf; total time=  15.3s
    [CV] END .....................C=100.0, gamma=1.0, kernel=rbf; total time=  15.7s
    [CV] END .....................C=100.0, gamma=1.0, kernel=rbf; total time=  15.6s
    [CV] END .....................C=100.0, gamma=1.0, kernel=rbf; total time=  17.0s
    [CV] END .....................C=100.0, gamma=1.0, kernel=rbf; total time=  17.3s
    [CV] END .....................C=100.0, gamma=1.0, kernel=rbf; total time=  18.0s
    [CV] END .....................C=100.0, gamma=3.0, kernel=rbf; total time=  20.3s
    [CV] END .....................C=100.0, gamma=3.0, kernel=rbf; total time=  18.3s
    [CV] END .....................C=100.0, gamma=3.0, kernel=rbf; total time=  18.1s
    [CV] END .....................C=100.0, gamma=3.0, kernel=rbf; total time=  18.8s
    [CV] END .....................C=100.0, gamma=3.0, kernel=rbf; total time=  19.1s
    [CV] END ....................C=300.0, gamma=0.01, kernel=rbf; total time=  19.6s
    [CV] END ....................C=300.0, gamma=0.01, kernel=rbf; total time=  19.6s
    [CV] END ....................C=300.0, gamma=0.01, kernel=rbf; total time=  19.3s
    [CV] END ....................C=300.0, gamma=0.01, kernel=rbf; total time=  19.6s
    [CV] END ....................C=300.0, gamma=0.01, kernel=rbf; total time=  19.4s
    [CV] END ....................C=300.0, gamma=0.03, kernel=rbf; total time=  19.1s
    [CV] END ....................C=300.0, gamma=0.03, kernel=rbf; total time=  19.4s
    [CV] END ....................C=300.0, gamma=0.03, kernel=rbf; total time=  19.6s
    [CV] END ....................C=300.0, gamma=0.03, kernel=rbf; total time=  19.2s
    [CV] END ....................C=300.0, gamma=0.03, kernel=rbf; total time=  19.7s
    [CV] END .....................C=300.0, gamma=0.1, kernel=rbf; total time=  18.9s
    [CV] END .....................C=300.0, gamma=0.1, kernel=rbf; total time=  18.8s
    [CV] END .....................C=300.0, gamma=0.1, kernel=rbf; total time=  18.9s
    [CV] END .....................C=300.0, gamma=0.1, kernel=rbf; total time=  19.1s
    [CV] END .....................C=300.0, gamma=0.1, kernel=rbf; total time=  19.0s
    [CV] END .....................C=300.0, gamma=0.3, kernel=rbf; total time=  16.8s
    [CV] END .....................C=300.0, gamma=0.3, kernel=rbf; total time=  17.1s
    [CV] END .....................C=300.0, gamma=0.3, kernel=rbf; total time=  15.8s
    [CV] END .....................C=300.0, gamma=0.3, kernel=rbf; total time=  16.6s
    [CV] END .....................C=300.0, gamma=0.3, kernel=rbf; total time=  16.5s
    [CV] END .....................C=300.0, gamma=1.0, kernel=rbf; total time=  17.6s
    [CV] END .....................C=300.0, gamma=1.0, kernel=rbf; total time=  17.1s
    [CV] END .....................C=300.0, gamma=1.0, kernel=rbf; total time=  18.4s
    [CV] END .....................C=300.0, gamma=1.0, kernel=rbf; total time=  17.9s
    [CV] END .....................C=300.0, gamma=1.0, kernel=rbf; total time=  16.7s
    [CV] END .....................C=300.0, gamma=3.0, kernel=rbf; total time=  16.2s
    [CV] END .....................C=300.0, gamma=3.0, kernel=rbf; total time=  17.3s
    [CV] END .....................C=300.0, gamma=3.0, kernel=rbf; total time=  20.1s
    [CV] END .....................C=300.0, gamma=3.0, kernel=rbf; total time=  17.2s
    [CV] END .....................C=300.0, gamma=3.0, kernel=rbf; total time=  16.5s
    [CV] END ...................C=1000.0, gamma=0.01, kernel=rbf; total time=  18.9s
    [CV] END ...................C=1000.0, gamma=0.01, kernel=rbf; total time=  18.0s
    [CV] END ...................C=1000.0, gamma=0.01, kernel=rbf; total time=  14.8s
    [CV] END ...................C=1000.0, gamma=0.01, kernel=rbf; total time=  15.9s
    [CV] END ...................C=1000.0, gamma=0.01, kernel=rbf; total time=  16.6s
    [CV] END ...................C=1000.0, gamma=0.03, kernel=rbf; total time=  17.1s
    [CV] END ...................C=1000.0, gamma=0.03, kernel=rbf; total time=  17.2s
    [CV] END ...................C=1000.0, gamma=0.03, kernel=rbf; total time=  16.7s
    [CV] END ...................C=1000.0, gamma=0.03, kernel=rbf; total time=  15.3s
    [CV] END ...................C=1000.0, gamma=0.03, kernel=rbf; total time=  17.1s
    [CV] END ....................C=1000.0, gamma=0.1, kernel=rbf; total time=  17.4s
    [CV] END ....................C=1000.0, gamma=0.1, kernel=rbf; total time=  16.8s
    [CV] END ....................C=1000.0, gamma=0.1, kernel=rbf; total time=  16.9s
    [CV] END ....................C=1000.0, gamma=0.1, kernel=rbf; total time=  17.3s
    [CV] END ....................C=1000.0, gamma=0.1, kernel=rbf; total time=  16.9s
    [CV] END ....................C=1000.0, gamma=0.3, kernel=rbf; total time=  17.4s
    [CV] END ....................C=1000.0, gamma=0.3, kernel=rbf; total time=  17.8s
    [CV] END ....................C=1000.0, gamma=0.3, kernel=rbf; total time=  16.8s
    [CV] END ....................C=1000.0, gamma=0.3, kernel=rbf; total time=  16.5s
    [CV] END ....................C=1000.0, gamma=0.3, kernel=rbf; total time=  16.2s
    [CV] END ....................C=1000.0, gamma=1.0, kernel=rbf; total time=  16.8s
    [CV] END ....................C=1000.0, gamma=1.0, kernel=rbf; total time=  15.9s
    [CV] END ....................C=1000.0, gamma=1.0, kernel=rbf; total time=  14.9s
    [CV] END ....................C=1000.0, gamma=1.0, kernel=rbf; total time=  15.4s
    [CV] END ....................C=1000.0, gamma=1.0, kernel=rbf; total time=  16.8s
    [CV] END ....................C=1000.0, gamma=3.0, kernel=rbf; total time=  18.5s
    [CV] END ....................C=1000.0, gamma=3.0, kernel=rbf; total time=  16.8s
    [CV] END ....................C=1000.0, gamma=3.0, kernel=rbf; total time=  15.4s
    [CV] END ....................C=1000.0, gamma=3.0, kernel=rbf; total time=  16.5s
    [CV] END ....................C=1000.0, gamma=3.0, kernel=rbf; total time=  16.6s
    




    GridSearchCV(cv=5, estimator=SVR(),
                 param_grid=[{'C': [10.0, 30.0, 100.0, 300.0, 1000.0, 3000.0,
                                    10000.0, 30000.0],
                              'kernel': ['linear']},
                             {'C': [1.0, 3.0, 10.0, 30.0, 100.0, 300.0, 1000.0],
                              'gamma': [0.01, 0.03, 0.1, 0.3, 1.0, 3.0],
                              'kernel': ['rbf']}],
                 scoring='neg_mean_squared_error', verbose=2)




```python
svm_grid_search.best_params_
```




    {'C': 300.0, 'kernel': 'linear'}



- The best SVR model is "SVR(kernel = 'linear', C = 300)".


```python
sv_reg_best_hyperparameter_grid = SVR(kernel = "linear", C = 300)
sv_reg_best_hyperparameter_grid.fit(housing_prepared, housing_labels)


lin_score_best_hyperparameter_grid = cross_val_score(sv_reg_best_hyperparameter_grid, housing_prepared, housing_labels,
                                                     scoring = "neg_mean_squared_error", cv = 10, n_jobs = 3)
lin_rmse_scores_best_hyperparameter_grid = np.sqrt(-lin_score_best_hyperparameter_grid)
display_scores(lin_rmse_scores_best_hyperparameter_grid)
```

    점수: [73702.52548357 67789.39652971 66871.67542368 71799.29899007
     68370.02808251 74840.63000345 72493.95538869 72038.68043754
     68820.75293042 71853.25704482]
    평균: 70858.02003144586
    표준편차: 2560.216679125353
    

### 2. Change GridSearchCV to RandomizedSearchCV.


```python
from sklearn.model_selection import RandomizedSearchCV

param_random = [
        {'kernel': ['linear'], 'C': np.arange(10.0, 1000.0)},
        {'kernel': ['rbf'], 'C': np.arange(100000.0, 200000.0),
         'gamma': np.arange(0.01, 3.0)},
    ]

svm_random_search = RandomizedSearchCV(svm_reg, 
                                       param_distributions = param_random, 
                                       n_iter = 50,
                                       cv = 5,
                                       scoring = "neg_mean_squared_error",
                                       verbose = 2,
                                       n_jobs = 6)

svm_random_search.fit(housing_prepared, housing_labels)
```

    Fitting 5 folds for each of 50 candidates, totalling 250 fits
    




    RandomizedSearchCV(cv=5, estimator=SVR(), n_iter=50, n_jobs=6,
                       param_distributions=[{'C': array([ 10.,  11.,  12.,  13.,  14.,  15.,  16.,  17.,  18.,  19.,  20.,
            21.,  22.,  23.,  24.,  25.,  26.,  27.,  28.,  29.,  30.,  31.,
            32.,  33.,  34.,  35.,  36.,  37.,  38.,  39.,  40.,  41.,  42.,
            43.,  44.,  45.,  46.,  47.,  48.,  49.,  50.,  51.,  52.,  53.,
            54.,  55.,  56.,  57.,  58.,  59.,  60.,  61.,  62.,  63.,  64.,
            65.,  66.,  67.,  68.,  69.,  70.,  71.,  72.,  73.,  74...
           956., 957., 958., 959., 960., 961., 962., 963., 964., 965., 966.,
           967., 968., 969., 970., 971., 972., 973., 974., 975., 976., 977.,
           978., 979., 980., 981., 982., 983., 984., 985., 986., 987., 988.,
           989., 990., 991., 992., 993., 994., 995., 996., 997., 998., 999.]),
                                             'kernel': ['linear']},
                                            {'C': array([100000., 100001., 100002., ..., 199997., 199998., 199999.]),
                                             'gamma': array([0.01, 1.01, 2.01]),
                                             'kernel': ['rbf']}],
                       scoring='neg_mean_squared_error', verbose=2)




```python
svm_random_search.best_params_
```




    {'kernel': 'rbf', 'gamma': 1.01, 'C': 194783.0}




```python
from sklearn.model_selection import RandomizedSearchCV

param_random = [{'kernel': ['rbf'], 'C': np.arange(190000.0, 200000.0), 'gamma': np.arange(1.0, 2.0)}]

svm_random_search = RandomizedSearchCV(svm_reg, 
                                       param_distributions = param_random, 
                                       n_iter = 10,
                                       cv = 5,
                                       scoring = "neg_mean_squared_error",
                                       verbose = 2,
                                       n_jobs = 6)

svm_random_search.fit(housing_prepared, housing_labels)
```

    Fitting 5 folds for each of 10 candidates, totalling 50 fits
    




    RandomizedSearchCV(cv=5, estimator=SVR(), n_jobs=6,
                       param_distributions=[{'C': array([190000., 190001., 190002., ..., 199997., 199998., 199999.]),
                                             'gamma': array([1.]),
                                             'kernel': ['rbf']}],
                       scoring='neg_mean_squared_error', verbose=2)




```python
svm_random_search.best_params_
```




    {'kernel': 'rbf', 'gamma': 1.0, 'C': 192319.0}




```python
from sklearn.model_selection import RandomizedSearchCV

param_random = [{'kernel': ['rbf'], 'C': np.arange(190000.0, 195000.0), 'gamma': np.arange(0.5, 1.0)}]

svm_random_search = RandomizedSearchCV(svm_reg, 
                                       param_distributions = param_random, 
                                       n_iter = 10,
                                       cv = 5,
                                       scoring = "neg_mean_squared_error",
                                       verbose = 2,
                                       n_jobs = 6)

svm_random_search.fit(housing_prepared, housing_labels)
```

    Fitting 5 folds for each of 10 candidates, totalling 50 fits
    




    RandomizedSearchCV(cv=5, estimator=SVR(), n_jobs=6,
                       param_distributions=[{'C': array([190000., 190001., 190002., ..., 194997., 194998., 194999.]),
                                             'gamma': array([0.5]),
                                             'kernel': ['rbf']}],
                       scoring='neg_mean_squared_error', verbose=2)




```python
svm_random_search.best_params_
```




    {'kernel': 'rbf', 'gamma': 0.5, 'C': 194183.0}




```python
from sklearn.model_selection import RandomizedSearchCV

param_random = [{'kernel': ['rbf'], 'C': np.arange(194000.0, 195000.0), 'gamma': np.arange(0.1, 0.5)}]

svm_random_search = RandomizedSearchCV(svm_reg, 
                                       param_distributions = param_random, 
                                       n_iter = 10,
                                       cv = 5,
                                       scoring = "neg_mean_squared_error",
                                       verbose = 2,
                                       n_jobs = 6)

svm_random_search.fit(housing_prepared, housing_labels)
```

    Fitting 5 folds for each of 10 candidates, totalling 50 fits
    




    RandomizedSearchCV(cv=5, estimator=SVR(), n_jobs=6,
                       param_distributions=[{'C': array([194000., 194001., 194002., 194003., 194004., 194005., 194006.,
           194007., 194008., 194009., 194010., 194011., 194012., 194013.,
           194014., 194015., 194016., 194017., 194018., 194019., 194020.,
           194021., 194022., 194023., 194024., 194025., 194026., 194027.,
           194028., 194029., 194030., 194031., 194032., 1940...
           194966., 194967., 194968., 194969., 194970., 194971., 194972.,
           194973., 194974., 194975., 194976., 194977., 194978., 194979.,
           194980., 194981., 194982., 194983., 194984., 194985., 194986.,
           194987., 194988., 194989., 194990., 194991., 194992., 194993.,
           194994., 194995., 194996., 194997., 194998., 194999.]),
                                             'gamma': array([0.1]),
                                             'kernel': ['rbf']}],
                       scoring='neg_mean_squared_error', verbose=2)




```python
svm_random_search.best_params_
```




    {'kernel': 'rbf', 'gamma': 0.1, 'C': 194967.0}



- The best SVR model is "SVR(kernel = 'rbf', gamma = 0.1, 'C' = 194700.0)".


```python
sv_reg_best_hyperparameter_random = SVR(kernel = "rbf", gamma= 0.1, C = 194700)
sv_reg_best_hyperparameter_random.fit(housing_prepared, housing_labels)


reg_score_best_hyperparameter_random = cross_val_score(sv_reg_best_hyperparameter_random, housing_prepared, housing_labels,
                                                       scoring = "neg_mean_squared_error", cv = 10)
reg_rmse_scores_best_hyperparameter_random = np.sqrt(-reg_score_best_hyperparameter_random)
display_scores(reg_rmse_scores_best_hyperparameter_random)
```

    점수: [58862.03263565 53255.44039193 51707.48954423 57682.65998941
     52555.75147372 58325.42973181 58210.16659083 55387.79445949
     54020.50211682 58557.82876872]
    평균: 55856.5095702598
    표준편차: 2641.3242337773827
    

### 3. Add the transducer that selects the most important characteristics to the staging pipeline.


```python
def indices_of_top_k(arr, k): #return top k indices
    return np.sort(np.argpartition(np.array(arr), -k)[-k:])
```


```python
class TopFeatureSelector(BaseEstimator, TransformerMixin): #class declaration, class name, class to inherit
    def __init__(self, feature_importances, k): #constructor, k = number of feature to collect
        self.feature_importances = feature_importances
        self.k = k
    
    def fit(self, X, y=None):
        self.feature_indices_ = indices_of_top_k(self.feature_importances, self.k) #get feature_importances's top k indices
        return self
    
    def transform(self, X):
        return X[:, self.feature_indices_] #return only top k importance features
```


```python
preparation_and_feature_selection_pipeline = Pipeline([
    ('preparation', full_pipeline),
    ('feature_selection', TopFeatureSelector(feature_importances, 5))
])
```


```python
housing_prepared_top_k_features = preparation_and_feature_selection_pipeline.fit_transform(housing)
```

### 4. Make the entire data preparation process and the final prediction into one pipeline


```python
preparation_and_feature_selection_pipeline = Pipeline([
    ('preparation', preparation_and_feature_selection_pipeline),
    ('svm_reg', SVR(kernel = "rbf", gamma= 0.1, C = 194700))
])
```
