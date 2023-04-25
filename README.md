# AutoServices_API

# Server

- 安裝環境

```jsx
npm install
```

- Run code

```jsx
node index
//或是
nodemon index
```

## Notice：

- 此程式需要自己建立.env才能在本地端運行
- 如果是在Saas,一般會有可以設置環境變數的地方,名稱都按照下面命名,至於值就要自己取得

### `.env` 內部的東西

- MONGO_URL：MongoDB 提供的連結,如果是本地端的MongoDB連結會長：`mongodb://127.0.0.1:27017/autoservices` 後面的autoservices是你的Database名稱
- JWT_SECRET：網站的Token ,隨便打越亂越好,最好可以再加密,沒有限制長度想怎樣就怎樣
- PORT：要運行後端的端口ex:`6001`
- SERVER_URL：AutoServices 後端的網站,如果是本地端：`http://localhost:6001`
- CLIENT_URL：AutoServices 前端的網站,如果是本地端：`http://localhost:8000`
- GOOGLE_SHEET_CRED：負責去讀取googlesheet 的secret key , 只要邀請此account就可以讀取被邀請的sheet的內容
- MAIL_ACCOUNT：負責去忘記密碼時傳送mail驗證碼的信箱的帳號
- MAIL_PASSWORD：負責去忘記密碼時傳送mail驗證碼的信箱的金鑰,不是mail的密碼,這個要另外申請
