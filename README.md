# NDAccountManager
NDAccountManager, kullanıcıların farklı platformlarda ve hizmetlerde kullandıkları hesap bilgilerini güvenli bir şekilde saklayabileceği ve yönetebileceği bir web uygulamasıdır. 
Bu proje, kullanıcıların çeşitli hesap bilgilerini merkezi bir yerde toplamasını ve yönetmesini sağlar. 
Kullanıcılar web arayüzünden erişim bilgilerini kaydedebilir, düzenleyebilir ve görüntüleyebilir. 
Ayrıca, kullanıcılar hesaplarını süreli veya süresiz olarak diğer kullanıcılarla paylaşabilirler.

## Kurulum ve yapılandırma

1. Azure AD (Entra ID) Ayarları 

- Azure Portal'a Giriş Yapın: Azure Portal adresine gidin ve Azure hesabınıza giriş yapın.
- App Registrations: Sol menüden "Azure Active Directory" seçeneğine tıklayın, ardından "App registrations" kısmına gidin ve yeni bir uygulama kaydı oluşturun.

- Redirect URI Ekleme:
  - "Redirect URIs" kısmına gidin ve "Add a Redirect URI" seçeneğine tıklayın.
    - Web platformunu seçin ve aşağıdaki URL'leri ekleyin:
      - https://localhost:'sslPort'/signin-oidc
      - https://localhost:'sslPort'/signout-oidc
    - sslPort değeri launchSettings.json dosyasında bulunabilir.
    - ID Tokens: "ID tokens" seçeneğinin işaretli olduğundan emin olun.
      
- App Roles: "App roles" kısmına gidin ve gerekli rolleri (örneğin: Manager, Sales, Development, Support) ekleyin.
- Kullanıcılar ve Roller: Portalda kullanıcılar oluşturun ve belirlenen rolleri bu kullanıcılara atayın.
- API Permissions: Gerekli izinleri (API permissions) uygulamanıza tanımlayın.


2. Uygulama Yapılandırması

- appsettings.json Dosyasını Düzenleyin:
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

- Veritabanı Ayarları:
  - PostgreSQL kullanın.
  - Veritabanı bağlantısını appsettings.json dosyasında belirtilen şekilde yapılandırın.

- Veritabanı Tablosunu Oluşturun:
  - Entity Framework Migration araçlarını kullanarak veritabanı tablosunu oluşturun. Bu işlem için terminal veya komut satırında aşağıdaki komutları kullanabilirsiniz:
    
    ```
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    ```
