# 大明后勤管理网站
## 使用须知：
将./src/server.js中的：
```process.env.PATH = `${path.resolve('./path/to/python')}:${process.env.PATH}`;```
`'./path/to/python'`替换为你的Python解释器位置
(如果你不知道python解释器的位置，在终端输入:`where python`)
## 数据库脚本
### users:
```
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    tag VARCHAR(60) DEFAULT "members",
    ranks VARCHAR(60),
    company VARCHAR(60),
    kills INT DEFAULT 0,
    attendance INT DEFAULT 0,
    balance DOUBLE DEFAULT 0,
    password VARCHAR(60),
    enrollmentTime VARCHAR(60), 
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
```
INSERT INTO users (username,tag,ranks,company,kills,attendance,balance,password,enrollmentTime) VALUES  ("JiangHuDao","ZhiZuMan","QH","SQ",123,456,1234,123456,'2022-1-1');
```
### products:
```
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  description TEXT,
  image_url VARCHAR(255)
);
```
```
INSERT INTO products (name, price, quantity, description, image_url) VALUES ('骑砍二', 199, 1, '骑砍二CDK', 'https://pic.imgdb.cn/item/64f682e9661c6c8e5488f618.png');
```

### orders:
```
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255), -- 用户名
    product_name VARCHAR(255), -- 商品名
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 订单创建日期和时间
    product_price DECIMAL(10, 2) -- 商品价格
);
```

## 未来的工作
将跨平台等相关设置存储到配置文件中，比如package.json里面的：
`"start2": "concurrently \"npm run server\" \"set PORT=3001 && npm run client\""`，在Linux中要将`set`换为`export`
还有开发时使用的localhost:3000也要打包成一个单独的变量然后可以随意设置，而不是像现在这样需要频繁的搜索全部文件进行修改
注，修改localhost:3000时，注意/client/src/setupProxy里面的不要修改，我不确定该文件是否有用，但是实践证明不需修改

修改bug，需要地方肯定有很多的bug，比如可能有些页面的导航栏的请求网址依旧是压力大古而不是已经写好的界面