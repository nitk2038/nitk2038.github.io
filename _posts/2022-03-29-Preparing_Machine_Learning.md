---
layout: single
title:  "Preparing Machine Learning."
categories: Machine_Learning
tag: [blog, python, coding, Machine_Learning, pandas, matplotlib]
toc: true
toc_sticky: true
author_profile: true

---

# Preparing Machine Learning (Data preprocessing)

## looking for scikit-learn's sample data


```python
import pandas as pd
from sklearn.datasets import load_iris

data = load_iris()

X = pd.DataFrame(data.data, columns = data.feature_names)
y = pd.DataFrame(data.target, columns = ['Species'])

df = pd.concat([X, y], axis = 1)
df.head()
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
      <th>sepal length (cm)</th>
      <th>sepal width (cm)</th>
      <th>petal length (cm)</th>
      <th>petal width (cm)</th>
      <th>Species</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



## example of supervised learning (classification)

### data preprocessing


```python
from sklearn.datasets import load_breast_cancer

data = load_breast_cancer()
```


```python
X = data.data
y = data.target
```


```python
X = X[:, :10]
```

### implementation method


```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(solver = 'lbfgs')
```


```python
model.fit(X, y)
```




    LogisticRegression()




```python
y_pred = model.predict(X)
```

### accuracy eveluation


```python
from sklearn.metrics import accuracy_score

accuracy_score(y, y_pred)
```




    0.9121265377855887



## example of unsupervised learning

### introducing dataset and model implementation


```python
from sklearn.datasets import load_wine

data = load_wine()
```


```python
X = data.data[:, [0, 9]]
```

### model implementation and learning and prediction


```python
from sklearn.cluster import KMeans

n_cluster = 3
model = KMeans(n_clusters = n_cluster)
```


```python
pred = model.fit_predict(X)
```


```python
%matplotlib inline
import matplotlib.pyplot as plt

fig, ax = plt.subplots()

ax.scatter(X[pred==0, 0], X[pred == 0, 1], color = 'red', marker = 's', label = 'Label1')
ax.scatter(X[pred==1, 0], X[pred == 1, 1], color = 'blue', marker = 's', label = 'Label2')
ax.scatter(X[pred==2, 0], X[pred == 2, 1], color = 'green', marker = 's', label = 'Label3')
ax.scatter(model.cluster_centers_[:, 0], model.cluster_centers_[:, 1], s = 200, color = 'yellow', marker = '*', label = 'center')
ax.legend()

plt.show()
```


    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_21_0.png)
    


## graph output using matplotlib

###  print the graph inline


```python
%matplotlib inline

import numpy as np
import matplotlib.pyplot as plt
```


```python
x1 = np.linspace(-5,5, 101)
y1 = np.sin(x1)
```


```python
plt.plot(x1, y1)
```




    [<matplotlib.lines.Line2D at 0x21e7f424100>]




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_26_1.png)
    



```python
fig, ax = plt.subplots()

ax.set_title('Sin')
ax.set_xlabel('rad')
ax.plot(x1, y1)

handles, labels = ax.get_legend_handles_labels()
ax.legend(handles, labels)
plt.show()
```


    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_27_0.png)
    


### print the various graph


```python
x2 = np.arange(100)
y2 = x2 * np.random.rand(100)
```

#### scatter


```python
plt.scatter(x2, y2)
```




    <matplotlib.collections.PathCollection at 0x21e7f5a12e0>




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_31_1.png)
    


#### histogram


```python
plt.hist(y2, bins = 5)
```




    (array([50., 29., 13.,  4.,  4.]),
     array([ 0.        , 18.29572354, 36.59144708, 54.88717062, 73.18289416,
            91.4786177 ]),
     <BarContainer object of 5 artists>)




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_33_1.png)
    


#### bar graph


```python
plt.bar(x2, y2)
```




    <BarContainer object of 100 artists>




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_35_1.png)
    


#### line graph


```python
plt.plot(x2, y2)
```




    [<matplotlib.lines.Line2D at 0x21e7f7ad2e0>]




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_37_1.png)
    


#### box graph


```python
plt.boxplot(y2)
```




    {'whiskers': [<matplotlib.lines.Line2D at 0x21e7f804ee0>,
      <matplotlib.lines.Line2D at 0x21e7f8151f0>],
     'caps': [<matplotlib.lines.Line2D at 0x21e7f8154c0>,
      <matplotlib.lines.Line2D at 0x21e7f815790>],
     'boxes': [<matplotlib.lines.Line2D at 0x21e7f804c40>],
     'medians': [<matplotlib.lines.Line2D at 0x21e7f815a60>],
     'fliers': [<matplotlib.lines.Line2D at 0x21e7f815d30>],
     'means': []}




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_39_1.png)
    


### visualization of wine datasets


```python
from sklearn.datasets import load_wine

data = load_wine()
```


```python
x3 = data.data[:, [0]]
y3 = data.data[:, [9]]
```


```python
plt.scatter(x3, y3)
```




    <matplotlib.collections.PathCollection at 0x21e11d83fd0>




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_43_1.png)
    



```python
plt.hist(y3, bins = 5)
```




    (array([58., 70., 30., 16.,  4.]),
     array([ 1.28 ,  3.624,  5.968,  8.312, 10.656, 13.   ]),
     <BarContainer object of 5 artists>)




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_44_1.png)
    


## Use pandas to understand and handle data


```python
import pandas as pd
```


```python
from sklearn.datasets import load_wine

data = load_wine()
df_X = pd.DataFrame(data.data, columns = data.feature_names)
```


```python
df_X.head()
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
      <th>alcohol</th>
      <th>malic_acid</th>
      <th>ash</th>
      <th>alcalinity_of_ash</th>
      <th>magnesium</th>
      <th>total_phenols</th>
      <th>flavanoids</th>
      <th>nonflavanoid_phenols</th>
      <th>proanthocyanins</th>
      <th>color_intensity</th>
      <th>hue</th>
      <th>od280/od315_of_diluted_wines</th>
      <th>proline</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>14.23</td>
      <td>1.71</td>
      <td>2.43</td>
      <td>15.6</td>
      <td>127.0</td>
      <td>2.80</td>
      <td>3.06</td>
      <td>0.28</td>
      <td>2.29</td>
      <td>5.64</td>
      <td>1.04</td>
      <td>3.92</td>
      <td>1065.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>13.20</td>
      <td>1.78</td>
      <td>2.14</td>
      <td>11.2</td>
      <td>100.0</td>
      <td>2.65</td>
      <td>2.76</td>
      <td>0.26</td>
      <td>1.28</td>
      <td>4.38</td>
      <td>1.05</td>
      <td>3.40</td>
      <td>1050.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>13.16</td>
      <td>2.36</td>
      <td>2.67</td>
      <td>18.6</td>
      <td>101.0</td>
      <td>2.80</td>
      <td>3.24</td>
      <td>0.30</td>
      <td>2.81</td>
      <td>5.68</td>
      <td>1.03</td>
      <td>3.17</td>
      <td>1185.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>14.37</td>
      <td>1.95</td>
      <td>2.50</td>
      <td>16.8</td>
      <td>113.0</td>
      <td>3.85</td>
      <td>3.49</td>
      <td>0.24</td>
      <td>2.18</td>
      <td>7.80</td>
      <td>0.86</td>
      <td>3.45</td>
      <td>1480.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>13.24</td>
      <td>2.59</td>
      <td>2.87</td>
      <td>21.0</td>
      <td>118.0</td>
      <td>2.80</td>
      <td>2.69</td>
      <td>0.39</td>
      <td>1.82</td>
      <td>4.32</td>
      <td>1.04</td>
      <td>2.93</td>
      <td>735.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_y = pd.DataFrame(data.target, columns = ['kind(target)'])
```


```python
df_y.head()
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
      <th>kind(target)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
df = pd.concat([df_X, df_y], axis = 1)
```


```python
df.head()
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
      <th>alcohol</th>
      <th>malic_acid</th>
      <th>ash</th>
      <th>alcalinity_of_ash</th>
      <th>magnesium</th>
      <th>total_phenols</th>
      <th>flavanoids</th>
      <th>nonflavanoid_phenols</th>
      <th>proanthocyanins</th>
      <th>color_intensity</th>
      <th>hue</th>
      <th>od280/od315_of_diluted_wines</th>
      <th>proline</th>
      <th>kind(target)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>14.23</td>
      <td>1.71</td>
      <td>2.43</td>
      <td>15.6</td>
      <td>127.0</td>
      <td>2.80</td>
      <td>3.06</td>
      <td>0.28</td>
      <td>2.29</td>
      <td>5.64</td>
      <td>1.04</td>
      <td>3.92</td>
      <td>1065.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>13.20</td>
      <td>1.78</td>
      <td>2.14</td>
      <td>11.2</td>
      <td>100.0</td>
      <td>2.65</td>
      <td>2.76</td>
      <td>0.26</td>
      <td>1.28</td>
      <td>4.38</td>
      <td>1.05</td>
      <td>3.40</td>
      <td>1050.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>13.16</td>
      <td>2.36</td>
      <td>2.67</td>
      <td>18.6</td>
      <td>101.0</td>
      <td>2.80</td>
      <td>3.24</td>
      <td>0.30</td>
      <td>2.81</td>
      <td>5.68</td>
      <td>1.03</td>
      <td>3.17</td>
      <td>1185.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>14.37</td>
      <td>1.95</td>
      <td>2.50</td>
      <td>16.8</td>
      <td>113.0</td>
      <td>3.85</td>
      <td>3.49</td>
      <td>0.24</td>
      <td>2.18</td>
      <td>7.80</td>
      <td>0.86</td>
      <td>3.45</td>
      <td>1480.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>13.24</td>
      <td>2.59</td>
      <td>2.87</td>
      <td>21.0</td>
      <td>118.0</td>
      <td>2.80</td>
      <td>2.69</td>
      <td>0.39</td>
      <td>1.82</td>
      <td>4.32</td>
      <td>1.04</td>
      <td>2.93</td>
      <td>735.0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
plt.hist(df.loc[:, 'alcohol'])
```




    (array([ 1., 10., 19., 31., 21., 27., 25., 25., 17.,  2.]),
     array([11.03, 11.41, 11.79, 12.17, 12.55, 12.93, 13.31, 13.69, 14.07,
            14.45, 14.83]),
     <BarContainer object of 10 artists>)




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_53_1.png)
    



```python
plt.boxplot(df.loc[:, 'alcohol'])
```




    {'whiskers': [<matplotlib.lines.Line2D at 0x21e13c42340>,
      <matplotlib.lines.Line2D at 0x21e13c42610>],
     'caps': [<matplotlib.lines.Line2D at 0x21e13c428e0>,
      <matplotlib.lines.Line2D at 0x21e13c42bb0>],
     'boxes': [<matplotlib.lines.Line2D at 0x21e13c42070>],
     'medians': [<matplotlib.lines.Line2D at 0x21e13c42e80>],
     'fliers': [<matplotlib.lines.Line2D at 0x21e13c50190>],
     'means': []}




    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_54_1.png)
    



```python
df.corr()
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
      <th>alcohol</th>
      <th>malic_acid</th>
      <th>ash</th>
      <th>alcalinity_of_ash</th>
      <th>magnesium</th>
      <th>total_phenols</th>
      <th>flavanoids</th>
      <th>nonflavanoid_phenols</th>
      <th>proanthocyanins</th>
      <th>color_intensity</th>
      <th>hue</th>
      <th>od280/od315_of_diluted_wines</th>
      <th>proline</th>
      <th>kind(target)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>alcohol</th>
      <td>1.000000</td>
      <td>0.094397</td>
      <td>0.211545</td>
      <td>-0.310235</td>
      <td>0.270798</td>
      <td>0.289101</td>
      <td>0.236815</td>
      <td>-0.155929</td>
      <td>0.136698</td>
      <td>0.546364</td>
      <td>-0.071747</td>
      <td>0.072343</td>
      <td>0.643720</td>
      <td>-0.328222</td>
    </tr>
    <tr>
      <th>malic_acid</th>
      <td>0.094397</td>
      <td>1.000000</td>
      <td>0.164045</td>
      <td>0.288500</td>
      <td>-0.054575</td>
      <td>-0.335167</td>
      <td>-0.411007</td>
      <td>0.292977</td>
      <td>-0.220746</td>
      <td>0.248985</td>
      <td>-0.561296</td>
      <td>-0.368710</td>
      <td>-0.192011</td>
      <td>0.437776</td>
    </tr>
    <tr>
      <th>ash</th>
      <td>0.211545</td>
      <td>0.164045</td>
      <td>1.000000</td>
      <td>0.443367</td>
      <td>0.286587</td>
      <td>0.128980</td>
      <td>0.115077</td>
      <td>0.186230</td>
      <td>0.009652</td>
      <td>0.258887</td>
      <td>-0.074667</td>
      <td>0.003911</td>
      <td>0.223626</td>
      <td>-0.049643</td>
    </tr>
    <tr>
      <th>alcalinity_of_ash</th>
      <td>-0.310235</td>
      <td>0.288500</td>
      <td>0.443367</td>
      <td>1.000000</td>
      <td>-0.083333</td>
      <td>-0.321113</td>
      <td>-0.351370</td>
      <td>0.361922</td>
      <td>-0.197327</td>
      <td>0.018732</td>
      <td>-0.273955</td>
      <td>-0.276769</td>
      <td>-0.440597</td>
      <td>0.517859</td>
    </tr>
    <tr>
      <th>magnesium</th>
      <td>0.270798</td>
      <td>-0.054575</td>
      <td>0.286587</td>
      <td>-0.083333</td>
      <td>1.000000</td>
      <td>0.214401</td>
      <td>0.195784</td>
      <td>-0.256294</td>
      <td>0.236441</td>
      <td>0.199950</td>
      <td>0.055398</td>
      <td>0.066004</td>
      <td>0.393351</td>
      <td>-0.209179</td>
    </tr>
    <tr>
      <th>total_phenols</th>
      <td>0.289101</td>
      <td>-0.335167</td>
      <td>0.128980</td>
      <td>-0.321113</td>
      <td>0.214401</td>
      <td>1.000000</td>
      <td>0.864564</td>
      <td>-0.449935</td>
      <td>0.612413</td>
      <td>-0.055136</td>
      <td>0.433681</td>
      <td>0.699949</td>
      <td>0.498115</td>
      <td>-0.719163</td>
    </tr>
    <tr>
      <th>flavanoids</th>
      <td>0.236815</td>
      <td>-0.411007</td>
      <td>0.115077</td>
      <td>-0.351370</td>
      <td>0.195784</td>
      <td>0.864564</td>
      <td>1.000000</td>
      <td>-0.537900</td>
      <td>0.652692</td>
      <td>-0.172379</td>
      <td>0.543479</td>
      <td>0.787194</td>
      <td>0.494193</td>
      <td>-0.847498</td>
    </tr>
    <tr>
      <th>nonflavanoid_phenols</th>
      <td>-0.155929</td>
      <td>0.292977</td>
      <td>0.186230</td>
      <td>0.361922</td>
      <td>-0.256294</td>
      <td>-0.449935</td>
      <td>-0.537900</td>
      <td>1.000000</td>
      <td>-0.365845</td>
      <td>0.139057</td>
      <td>-0.262640</td>
      <td>-0.503270</td>
      <td>-0.311385</td>
      <td>0.489109</td>
    </tr>
    <tr>
      <th>proanthocyanins</th>
      <td>0.136698</td>
      <td>-0.220746</td>
      <td>0.009652</td>
      <td>-0.197327</td>
      <td>0.236441</td>
      <td>0.612413</td>
      <td>0.652692</td>
      <td>-0.365845</td>
      <td>1.000000</td>
      <td>-0.025250</td>
      <td>0.295544</td>
      <td>0.519067</td>
      <td>0.330417</td>
      <td>-0.499130</td>
    </tr>
    <tr>
      <th>color_intensity</th>
      <td>0.546364</td>
      <td>0.248985</td>
      <td>0.258887</td>
      <td>0.018732</td>
      <td>0.199950</td>
      <td>-0.055136</td>
      <td>-0.172379</td>
      <td>0.139057</td>
      <td>-0.025250</td>
      <td>1.000000</td>
      <td>-0.521813</td>
      <td>-0.428815</td>
      <td>0.316100</td>
      <td>0.265668</td>
    </tr>
    <tr>
      <th>hue</th>
      <td>-0.071747</td>
      <td>-0.561296</td>
      <td>-0.074667</td>
      <td>-0.273955</td>
      <td>0.055398</td>
      <td>0.433681</td>
      <td>0.543479</td>
      <td>-0.262640</td>
      <td>0.295544</td>
      <td>-0.521813</td>
      <td>1.000000</td>
      <td>0.565468</td>
      <td>0.236183</td>
      <td>-0.617369</td>
    </tr>
    <tr>
      <th>od280/od315_of_diluted_wines</th>
      <td>0.072343</td>
      <td>-0.368710</td>
      <td>0.003911</td>
      <td>-0.276769</td>
      <td>0.066004</td>
      <td>0.699949</td>
      <td>0.787194</td>
      <td>-0.503270</td>
      <td>0.519067</td>
      <td>-0.428815</td>
      <td>0.565468</td>
      <td>1.000000</td>
      <td>0.312761</td>
      <td>-0.788230</td>
    </tr>
    <tr>
      <th>proline</th>
      <td>0.643720</td>
      <td>-0.192011</td>
      <td>0.223626</td>
      <td>-0.440597</td>
      <td>0.393351</td>
      <td>0.498115</td>
      <td>0.494193</td>
      <td>-0.311385</td>
      <td>0.330417</td>
      <td>0.316100</td>
      <td>0.236183</td>
      <td>0.312761</td>
      <td>1.000000</td>
      <td>-0.633717</td>
    </tr>
    <tr>
      <th>kind(target)</th>
      <td>-0.328222</td>
      <td>0.437776</td>
      <td>-0.049643</td>
      <td>0.517859</td>
      <td>-0.209179</td>
      <td>-0.719163</td>
      <td>-0.847498</td>
      <td>0.489109</td>
      <td>-0.499130</td>
      <td>0.265668</td>
      <td>-0.617369</td>
      <td>-0.788230</td>
      <td>-0.633717</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.describe()
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
      <th>alcohol</th>
      <th>malic_acid</th>
      <th>ash</th>
      <th>alcalinity_of_ash</th>
      <th>magnesium</th>
      <th>total_phenols</th>
      <th>flavanoids</th>
      <th>nonflavanoid_phenols</th>
      <th>proanthocyanins</th>
      <th>color_intensity</th>
      <th>hue</th>
      <th>od280/od315_of_diluted_wines</th>
      <th>proline</th>
      <th>kind(target)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
      <td>178.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>13.000618</td>
      <td>2.336348</td>
      <td>2.366517</td>
      <td>19.494944</td>
      <td>99.741573</td>
      <td>2.295112</td>
      <td>2.029270</td>
      <td>0.361854</td>
      <td>1.590899</td>
      <td>5.058090</td>
      <td>0.957449</td>
      <td>2.611685</td>
      <td>746.893258</td>
      <td>0.938202</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.811827</td>
      <td>1.117146</td>
      <td>0.274344</td>
      <td>3.339564</td>
      <td>14.282484</td>
      <td>0.625851</td>
      <td>0.998859</td>
      <td>0.124453</td>
      <td>0.572359</td>
      <td>2.318286</td>
      <td>0.228572</td>
      <td>0.709990</td>
      <td>314.907474</td>
      <td>0.775035</td>
    </tr>
    <tr>
      <th>min</th>
      <td>11.030000</td>
      <td>0.740000</td>
      <td>1.360000</td>
      <td>10.600000</td>
      <td>70.000000</td>
      <td>0.980000</td>
      <td>0.340000</td>
      <td>0.130000</td>
      <td>0.410000</td>
      <td>1.280000</td>
      <td>0.480000</td>
      <td>1.270000</td>
      <td>278.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>12.362500</td>
      <td>1.602500</td>
      <td>2.210000</td>
      <td>17.200000</td>
      <td>88.000000</td>
      <td>1.742500</td>
      <td>1.205000</td>
      <td>0.270000</td>
      <td>1.250000</td>
      <td>3.220000</td>
      <td>0.782500</td>
      <td>1.937500</td>
      <td>500.500000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>13.050000</td>
      <td>1.865000</td>
      <td>2.360000</td>
      <td>19.500000</td>
      <td>98.000000</td>
      <td>2.355000</td>
      <td>2.135000</td>
      <td>0.340000</td>
      <td>1.555000</td>
      <td>4.690000</td>
      <td>0.965000</td>
      <td>2.780000</td>
      <td>673.500000</td>
      <td>1.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>13.677500</td>
      <td>3.082500</td>
      <td>2.557500</td>
      <td>21.500000</td>
      <td>107.000000</td>
      <td>2.800000</td>
      <td>2.875000</td>
      <td>0.437500</td>
      <td>1.950000</td>
      <td>6.200000</td>
      <td>1.120000</td>
      <td>3.170000</td>
      <td>985.000000</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>14.830000</td>
      <td>5.800000</td>
      <td>3.230000</td>
      <td>30.000000</td>
      <td>162.000000</td>
      <td>3.880000</td>
      <td>5.080000</td>
      <td>0.660000</td>
      <td>3.580000</td>
      <td>13.000000</td>
      <td>1.710000</td>
      <td>4.000000</td>
      <td>1680.000000</td>
      <td>2.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
from pandas.plotting import scatter_matrix

_ = scatter_matrix(df, figsize = (15, 15))
```


    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_57_0.png)
    



```python
_ = scatter_matrix(df.iloc[:, [0, 9, -1]])
```


    
![png](/images/2022-03-29-Preparing_Machine_Learning/output_58_0.png)