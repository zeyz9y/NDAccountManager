# NDAccountManager
NDAccountManager, kullan�c�lar�n farkl� platformlarda ve hizmetlerde kulland�klar� hesap bilgilerini g�venli bir �ekilde saklayabilece�i ve y�netebilece�i bir web uygulamas�d�r. 
Bu proje, kullan�c�lar�n �e�itli hesap bilgilerini merkezi bir yerde toplamas�n� ve y�netmesini sa�lar. 
Kullan�c�lar web aray�z�nden eri�im bilgilerini kaydedebilir, d�zenleyebilir ve g�r�nt�leyebilir. 
Ayr�ca, kullan�c�lar hesaplar�n� s�reli veya s�resiz olarak di�er kullan�c�larla payla�abilirler.

## Kurulum ve yap�land�rma

1. Azure AD (Entra ID) Ayarlar� 

- Azure Portal'a Giri� Yap�n: Azure Portal adresine gidin ve Azure hesab�n�za giri� yap�n.
- App Registrations: Sol men�den "Azure Active Directory" se�ene�ine t�klay�n, ard�ndan "App registrations" k�sm�na gidin ve yeni bir uygulama kayd� olu�turun.

- Redirect URI Ekleme:
  - "Redirect URIs" k�sm�na gidin ve "Add a Redirect URI" se�ene�ine t�klay�n.
    - Web platformunu se�in ve a�a��daki URL'leri ekleyin:
      - https://localhost:'sslPort'/signin-oidc
      - https://localhost:'sslPort'/signout-oidc
    - sslPort de�eri launchSettings.json dosyas�nda bulunabilir.

- ID Tokens: "ID tokens" se�ene�inin i�aretli oldu�undan emin olun.
- App Roles: "App roles" k�sm�na gidin ve gerekli rolleri (�rne�in: Manager, Sales, Development, Support) ekleyin.
- Kullan�c�lar ve Roller: Portalda kullan�c�lar olu�turun ve belirlenen rolleri bu kullan�c�lara atay�n.
- API Permissions: Gerekli izinleri (API permissions) uygulaman�za tan�mlay�n.


2. Uygulama Yap�land�rmas�

- appsettings.json Dosyas�n� D�zenleyin:
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

- Veritaban� Ayarlar�:
  - PostgreSQL kullan�n.
  - Veritaban� ba�lant�s�n� appsettings.json dosyas�nda belirtilen �ekilde yap�land�r�n.

- Veritaban� Tablosunu Olu�turun:
  - Entity Framework Migration ara�lar�n� kullanarak veritaban� tablosunu olu�turun. Bu i�lem i�in terminal veya komut sat�r�nda a�a��daki komutlar� kullanabilirsiniz:
    
    ```
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    ```
