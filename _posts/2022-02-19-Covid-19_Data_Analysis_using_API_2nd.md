---
layout: single
title:  "COVID-19 Data Analysis using API 2nd"
categories: coding
tag: [blog, python, jupyter, COVID-19. coding]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# Covid-19 Data Analysis using API

## import libraries


```python
import requests
import lxml
from bs4 import BeautifulSoup

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import folium
import json
```

## get korean font


```python
from matplotlib import font_manager, rc
font_path = "./malgun.ttf"
font_name = font_manager.FontProperties(fname = font_path).get_name()
rc('font', family = font_name)
```

## get API by url


```python
url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'
params = {'serviceKey' : 'IWgrDM+4GOSJhH0nGL55Ti6Fwuqu2n3XUI62tcyuY/3X9173+MrWx/rSPfcLf0ggEGdktGcg+KtmhAD7p84Hfg==',
         'pageNo' : '1', 'numOfRows' : '10', 'startCreateDt' : '20200410', 'endCreateDt' : '20240211'}

response = requests.get(url, params = params)
soup = BeautifulSoup(response.text, 'lxml-xml')
items = soup.find_all("item")
```

## get data at API


```python
def parse():
    try:
        STD_DAY = item.find("stdDay").get_text()
        GUBUN = item.find("gubun").get_text()
        INC_DEC = item.find("incDec").get_text()
        DEF_CNT = item.find("defCnt").get_text()
        DEATH_CNT = item.find("deathCnt").get_text()
        ISOL_CLEAR_CNT = item.find("isolClearCnt").get_text()
        OVER_FLOW_CNT = item.find("overFlowCnt").get_text()
        LOCAL_OCC_CNT = item.find("localOccCnt").get_text()
        QUR_RATE = item.find("qurRate").get_text()
        return {
            "기준일시" : STD_DAY,
            "구분" : GUBUN,
            "전일대비 증감 수" : INC_DEC,
            "확진자 수" : DEF_CNT,
            "사망자 수" : DEATH_CNT,
            "격리 해제 수" : ISOL_CLEAR_CNT,
            "해외유입 수" : OVER_FLOW_CNT,
            "지역발생 수" : LOCAL_OCC_CNT,
            "10만명당 발생률" : QUR_RATE
        }
    except AttributeError as e:
        return {
            "기준일시" : np.NaN,
            "구분" : np.NaN,
            "전일대비 증감 수" : np.NaN,
            "확진자 수" : np.NaN,
            "사망자 수" : np.NaN,
            "격리 해제 수" : np.NaN,
            "해외유입 수" : np.NaN,
            "지역발생 수" : np.NaN,
            "10만명당 발생률" : np.NaN
        }
```


```python
row = []
for item in items:
    row.append(parse())
```

## create and preprocess dataframe


```python
df = pd.DataFrame(row)
for i in df.index:
     df.iat[i, 0] = df.iat[i, 0].replace('년 ', '-')
for i in df.index:
     df.iat[i, 0] = df.iat[i, 0].replace('월 ', '-')
for i in df.index:
     df.iat[i, 0] = df.iat[i, 0].replace('일 00시', '')
df = df.iloc[::-1]
df.rename(columns = {'기준일시' : '기준일'}, inplace = True)
df = df.set_index(['기준일'])
for i in range (1, 10):
    df.drop(('2022-01-27일 0' + str(i) + '시'), axis = 0, inplace = True)
for i in range (10, 19):
    df.drop(('2022-01-27일 ' + str(i) + '시'), axis = 0, inplace = True)
df.set_index(pd.to_datetime(df.index))
df.replace('657.29*', '657.29', inplace = True)
df.tail(19)
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
      <th>구분</th>
      <th>전일대비 증감 수</th>
      <th>확진자 수</th>
      <th>사망자 수</th>
      <th>격리 해제 수</th>
      <th>해외유입 수</th>
      <th>지역발생 수</th>
      <th>10만명당 발생률</th>
    </tr>
    <tr>
      <th>기준일</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-02-19</th>
      <td>합계</td>
      <td>102211</td>
      <td>1858009</td>
      <td>7354</td>
      <td>869695</td>
      <td>139</td>
      <td>102072</td>
      <td>3585</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>서울</td>
      <td>23193</td>
      <td>497821</td>
      <td>2283</td>
      <td>263206</td>
      <td>58</td>
      <td>23135</td>
      <td>5149</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>부산</td>
      <td>6536</td>
      <td>95234</td>
      <td>394</td>
      <td>41124</td>
      <td>2</td>
      <td>6534</td>
      <td>2808</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>대구</td>
      <td>4223</td>
      <td>79811</td>
      <td>440</td>
      <td>51126</td>
      <td>0</td>
      <td>4223</td>
      <td>3300</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>인천</td>
      <td>7816</td>
      <td>125758</td>
      <td>377</td>
      <td>58915</td>
      <td>0</td>
      <td>7816</td>
      <td>4273</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>광주</td>
      <td>2741</td>
      <td>43450</td>
      <td>110</td>
      <td>13489</td>
      <td>1</td>
      <td>2740</td>
      <td>2996</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>대전</td>
      <td>3032</td>
      <td>44625</td>
      <td>213</td>
      <td>15400</td>
      <td>2</td>
      <td>3030</td>
      <td>3048</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>울산</td>
      <td>1832</td>
      <td>25029</td>
      <td>70</td>
      <td>14474</td>
      <td>0</td>
      <td>1832</td>
      <td>2203</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>세종</td>
      <td>677</td>
      <td>9796</td>
      <td>4</td>
      <td>5509</td>
      <td>1</td>
      <td>676</td>
      <td>2753</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>경기</td>
      <td>30642</td>
      <td>567891</td>
      <td>2327</td>
      <td>229861</td>
      <td>1</td>
      <td>30641</td>
      <td>4229</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>강원</td>
      <td>1799</td>
      <td>35110</td>
      <td>129</td>
      <td>22008</td>
      <td>1</td>
      <td>1798</td>
      <td>2276</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>충북</td>
      <td>2394</td>
      <td>39055</td>
      <td>147</td>
      <td>24398</td>
      <td>2</td>
      <td>2392</td>
      <td>2440</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>충남</td>
      <td>4077</td>
      <td>61527</td>
      <td>228</td>
      <td>21292</td>
      <td>5</td>
      <td>4072</td>
      <td>2901</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>전북</td>
      <td>2492</td>
      <td>44318</td>
      <td>155</td>
      <td>24066</td>
      <td>6</td>
      <td>2486</td>
      <td>2457</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>전남</td>
      <td>1900</td>
      <td>33773</td>
      <td>51</td>
      <td>6931</td>
      <td>2</td>
      <td>1898</td>
      <td>1824</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>경북</td>
      <td>3186</td>
      <td>57223</td>
      <td>266</td>
      <td>19096</td>
      <td>6</td>
      <td>3180</td>
      <td>2168</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>경남</td>
      <td>4418</td>
      <td>73236</td>
      <td>130</td>
      <td>40610</td>
      <td>4</td>
      <td>4414</td>
      <td>2193</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>제주</td>
      <td>1206</td>
      <td>14871</td>
      <td>14</td>
      <td>9556</td>
      <td>1</td>
      <td>1205</td>
      <td>2204</td>
    </tr>
    <tr>
      <th>2022-02-19</th>
      <td>검역</td>
      <td>47</td>
      <td>9481</td>
      <td>16</td>
      <td>8634</td>
      <td>47</td>
      <td>0</td>
      <td>-</td>
    </tr>
  </tbody>
</table>
</div>




```python
plt.style.use('ggplot')
```


```python
def print_line_graph(division, df):
    fig = plt.figure(figsize = (20, 10))
    ax1 = fig.add_subplot(2,2,1)
    ax2 = fig.add_subplot(2,2,2)
    ax3 = fig.add_subplot(2,2,3)
    ax4 = fig.add_subplot(2,2,4)
    ax1.plot(df['전일대비 증감 수'].map(int), color = 'olive', linewidth = 2)
    ax2.plot(df['확진자 수'].map(int), color = 'skyblue', linewidth = 2)
    ax3.plot(df['사망자 수'].map(int), color = 'magenta', linewidth = 2)
    ax4.plot(df['10만명당 발생률'].map(float), color = 'yellow', linewidth = 2)
    ax1.set_title(division + ' 신규 확진자 수', size= 15)
    ax2.set_title(division + ' 누적 확진자 수', size= 15)
    ax3.set_title(division + ' 누적 사망자 수', size= 15)
    ax4.set_title(division + ' 10만명당 발생률', size= 15)
    ax1.axes.xaxis.set_ticks([''])
    ax2.axes.xaxis.set_ticks([''])
    ax3.axes.xaxis.set_ticks([''])
    ax4.axes.xaxis.set_ticks([''])
    plt.show()
```

## graph of confirmed cases by region

### nation wide


```python
mask = (df['구분'] == '합계')
df_sum = df[mask]
print_line_graph('전국', df_sum)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_16_0.png)
    


### seoul


```python
mask = (df['구분'] == '서울')
df_seoul = df[mask]
print_line_graph('서울', df_seoul)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_18_0.png)
    


### busan


```python
mask = df['구분'] == '부산'
df_busan = df[mask]
print_line_graph('부산', df_busan)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_20_0.png)
    


### daegu


```python
mask = df['구분'] == '대구'
df_daegu = df[mask]
print_line_graph('대구', df_daegu)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_22_0.png)
    


### incheon


```python
mask = df['구분'] == '인천'
df_incheon = df[mask]
print_line_graph('인천', df_incheon)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_24_0.png)
    


### gwangju


```python
mask = df['구분'] == '광주'
df_gwangju = df[mask]
print_line_graph('광주', df_gwangju)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_26_0.png)
    


### daejeon


```python
mask = df['구분'] == '대전'
df_daejeon = df[mask]
print_line_graph('대전', df_daejeon)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_28_0.png)
    


### ulsan


```python
mask = df['구분'] == '울산'
df_ulsan = df[mask]
print_line_graph('울산', df_ulsan)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_30_0.png)
    


### sejong


```python
mask = df['구분'] == '세종'
df_sejong = df[mask]
print_line_graph('세종', df_sejong)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_32_1.png)
    


### gyeonggi


```python
mask = df['구분'] == '경기'
df_gyeonggi = df[mask]
print_line_graph('경기', df_gyeonggi)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_34_0.png)
    


### gangwon


```python
mask = df['구분'] == '강원'
df_gangwon = df[mask]
print_line_graph('강원', df_gangwon)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_36_0.png)
    


### chungbuk


```python
mask = df['구분'] == '충북'
df_chungbuk = df[mask]
print_line_graph('충북', df_chungbuk)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_38_0.png)
    


### chungnam


```python
mask = df['구분'] == '충남'
df_chungnam = df[mask]
print_line_graph('충남', df_chungnam)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_40_0.png)
    


### jeonbuk


```python
mask = df['구분'] == '전북'
df_jeonbuk = df[mask]
print_line_graph('전북', df_jeonbuk)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_42_0.png)
    


### jeonnam


```python
mask = df['구분'] == '전남'
df_jeonnam = df[mask]
print_line_graph('전남', df_jeonnam)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_44_0.png)
    


### gyeongbuk


```python
mask = df['구분'] == '경북'
df_gyeongbuk = df[mask]
print_line_graph('경북', df_gyeongbuk)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_46_0.png)
    


### gyeongnam


```python
mask = df['구분'] == '경남'
df_gyeongnam = df[mask]
print_line_graph('경남', df_gyeongnam)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_48_0.png)
    


### jeju


```python
mask = df['구분'] == '제주'
df_jeju = df[mask]
print_line_graph('제주', df_jeju)
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_50_0.png)
    


## create a dataframe for the map


```python
df_geo = df.iloc[-18:-1]
df_geo = df_geo.set_index(['구분'])
index = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시',
        '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주도']
df_geo = pd.Series(df_geo['10만명당 발생률'].map(float))
df_geo = df_geo.rename(index = {'서울' : '서울특별시',
                               '부산' : '부산광역시',
                               '대구' : '대구광역시',
                               '인천' : '인천광역시',
                               '광주' : '광주광역시',
                               '대전' : '대전광역시',
                               '울산' : '울산광역시',
                               '세종' : '세종특별자치시',
                               '경기' : '경기도',
                               '강원' : '강원도',
                               '충북' : '충청북도',
                               '충남' : '충청남도',
                               '전북' : '전라북도',
                               '전남' : '전라남도',
                               '경북' : '경상북도',
                               '경남' : '경상남도',
                               '제주' : '제주특별자치도'})
df_geo = pd.DataFrame(df_geo)
```

## confirmed cases per 100,000 by region


```python
geo_path = './korea_city_borderline.json'
try:
    geo_data = json.load(open(geo_path, encoding = 'utf-8'))
except:
    geo_data = json.load(open(geo_path, encoding = 'utf-8-sig'))
map_covid = folium.Map(location=[37,127], zoom_start = 7)
folium.Choropleth(geo_data = geo_data,
                  data = df_geo["10만명당 발생률"],
                  columns = [df_geo.index, df_geo["10만명당 발생률"]],
                  key_on='feature.properties.CTP_KOR_NM',
                  fill_color='PuRd',
                  legend_name = '10만명당 발생률').add_to(map_covid)
display(map_covid)
```

>Click [here](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/map_covid.html) to see covid map



## Analysis of trends in the number of confirmed cases using Machine Learning

### make dataframe to use at machine learning


```python
mask = (df['구분'] == '합계')
df_machine_learning = df[mask]
df_machine_learning = df_machine_learning[['전일대비 증감 수', '확진자 수', '사망자 수', '격리 해제 수']]
```

### divide into train data and test data


```python
X = (pd.DataFrame(range(len(df_machine_learning.index)))).astype('int')
y = df_machine_learning['확진자 수'].astype('int')

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state = 10)
```

### import LinearRegression instance and PolynomialFeatures instance


```python
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
```

### create a first-order object poly


```python
poly = PolynomialFeatures(degree=10)
X_train_poly=poly.fit_transform(X_train)
```

### model training with train data


```python
pr = LinearRegression()   
pr.fit(X_train_poly, y_train)
```




    LinearRegression()



### calculate the coefficient of determination by applying the test data to the trained model


```python
X_test_poly = poly.fit_transform(X_test)
r_square = pr.score(X_test_poly,y_test)
print(r_square)
```

    0.9846929908949009
    

### output a scatter plot of train data and a regression plot predicted by test data as a graph


```python
y_hat_test = pr.predict(X_test_poly)
fig = plt.figure(figsize=(20, 7))
ax = fig.add_subplot(1, 1, 1)
ax.plot(X_train.to_numpy(), y_train, 'o', label='learned Data', color = 'blue')
ax.plot(X_test.to_numpy(), y_hat_test, 'r+', label='Predicted Value')
ax.legend(loc='best')
plt.xlabel('기준일', size = 20)
plt.ylabel('사망자 수', size = 20)
plt.show()
plt.close()
```


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_69_0.png)
    


### Enter full data into the model to compare predicted values to actual values


```python
X_ploy = poly.fit_transform(X)
y_hat = pr.predict(X_ploy)

plt.figure(figsize=(20, 7))
ax1 = sns.kdeplot(y, label="actual value")
ax2 = sns.kdeplot(y_hat, label="predicted value", ax=ax1)
plt.legend()
plt.show()
```

    C:\Users\bl4an\anaconda3\lib\site-packages\IPython\core\pylabtools.py:151: UserWarning: Glyph 8722 (\N{MINUS SIGN}) missing from current font.
      fig.canvas.print_figure(bytes_io, **kw)
    


    
![png](/images/2022-02-19-Covid-19_Data_Analysis_using_API_2nd/output_71_1.png)
    

