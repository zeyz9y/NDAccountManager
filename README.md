# NDAccountManager
NDAccountManager, kullanýcýlarýn farklý platformlarda ve hizmetlerde kullandýklarý hesap bilgilerini güvenli bir þekilde saklayabileceði ve yönetebileceði bir web uygulamasýdýr. 
Bu proje, kullanýcýlarýn çeþitli hesap bilgilerini merkezi bir yerde toplamasýný ve yönetmesini saðlar. 
Kullanýcýlar web arayüzünden eriþim bilgilerini kaydedebilir, düzenleyebilir ve görüntüleyebilir. 
Ayrýca, kullanýcýlar hesaplarýný süreli veya süresiz olarak diðer kullanýcýlarla paylaþabilirler.

## Kurulum ve yapýlandýrma

1. Azure AD (Entra ID) Ayarlarý 

- Azure Portal'a Giriþ Yapýn: Azure Portal adresine gidin ve Azure hesabýnýza giriþ yapýn.
- App Registrations: Sol menüden "Azure Active Directory" seçeneðine týklayýn, ardýndan "App registrations" kýsmýna gidin ve yeni bir uygulama kaydý oluþturun.

- Redirect URI Ekleme:
  - "Redirect URIs" kýsmýna gidin ve "Add a Redirect URI" seçeneðine týklayýn.
    - Web platformunu seçin ve aþaðýdaki URL'leri ekleyin:
      - https://localhost:'sslPort'/signin-oidc
      - https://localhost:'sslPort'/signout-oidc
    - sslPort deðeri launchSettings.json dosyasýnda bulunabilir.

- ID Tokens: "ID tokens" seçeneðinin iþaretli olduðundan emin olun.
- App Roles: "App roles" kýsmýna gidin ve gerekli rolleri (örneðin: Manager, Sales, Development, Support) ekleyin.
- Kullanýcýlar ve Roller: Portalda kullanýcýlar oluþturun ve belirlenen rolleri bu kullanýcýlara atayýn.
- API Permissions: Gerekli izinleri (API permissions) uygulamanýza tanýmlayýn.


2. Uygulama Yapýlandýrmasý

- appsettings.json Dosyasýný Düzenleyin:
```json
{
  "EntraId": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "your-domain",
    "TenantId": "your-tenantId",
    "ClientId": "your-clientId",
    "ClientSecret": "your-clientSecret",
    "CallbackPath": "/signin-oidc",
    "SignoutCallbackPath": "/signout-oidc"
  },
  "GraphV1": {
    "BaseUrl": "https://graph.microsoft.com/v1.0",
    "Scopes": [ "User.Read" ]
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database='your-database-name';Username='your-username';Password='your-password'"
  }
}
```

- Veritabaný Ayarlarý:
  - PostgreSQL kullanýn.
  - Veritabaný baðlantýsýný appsettings.json dosyasýnda belirtilen þekilde yapýlandýrýn.

- Veritabaný Tablosunu Oluþturun:
  - Entity Framework Migration araçlarýný kullanarak veritabaný tablosunu oluþturun. Bu iþlem için terminal veya komut satýrýnda aþaðýdaki komutlarý kullanabilirsiniz:
    
    ```
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    ```
