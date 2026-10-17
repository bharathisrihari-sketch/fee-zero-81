import { DeploymentGuide } from '../types';

export const GUIDES_DATA: DeploymentGuide[] = [
  {
    id: 'guide-signing',
    title: 'How to Build & Sign a Release APK / AAB',
    category: 'signing',
    timeEstimate: '10-15 Mins',
    difficulty: 'Beginner',
    summary: 'Before publishing to any alternative store or self-hosting, you must compile and sign a production Release APK with a keystore certificate.',
    prerequisites: [
      'Android Studio or Java Development Kit (JDK 17+)',
      'Your Android project source code (Kotlin, Java, React Native, Flutter, or Cordova)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Generate a Keystore Certificate using keytool',
        description: 'Open your terminal or command prompt and run keytool to create a private keystore file (.jks or .keystore).',
        codeLanguage: 'bash',
        codeSnippet: `keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias`,
        tip: 'Keep your keystore file and keystore password safe in a secure password manager! If lost, users cannot update your self-hosted or F-Droid app without re-signing.'
      },
      {
        stepNumber: 2,
        title: 'Configure android/app/build.gradle.kts (or build.gradle)',
        description: 'Add the signing configuration inside your Gradle file so release builds are automatically cryptographically signed.',
        codeLanguage: 'kotlin',
        codeSnippet: `android {
    ...
    defaultConfig {
        applicationId = "com.yourname.myapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    signingConfigs {
        create("release") {
            storeFile = file("my-release-key.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD") ?: "your_store_password"
            keyAlias = "my-key-alias"
            keyPassword = System.getenv("KEY_PASSWORD") ?: "your_key_password"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")
        }
    }
}`,
        warningNote: 'Never commit raw keystore passwords in public Git repositories! Use environment variables or local.properties.'
      },
      {
        stepNumber: 3,
        title: 'Build the Signed Release APK / AAB',
        description: 'Run the Gradle assembleRelease or bundleRelease command in your project root terminal.',
        codeLanguage: 'bash',
        codeSnippet: `# For standard APK build (universal install file):
./gradlew assembleRelease

# Output location:
# android/app/build/outputs/apk/release/app-release.apk

# For React Native:
npx react-native build-android --mode=release

# For Flutter:
flutter build apk --release`,
        tip: 'The resulting app-release.apk file is now ready to be uploaded to Amazon Appstore, GitHub Releases, APKPure, or hosted on your website!'
      }
    ]
  },
  {
    id: 'guide-fdroid',
    title: 'Publishing to F-Droid (Open Source Store)',
    category: 'store',
    timeEstimate: '20-30 Mins',
    difficulty: 'Intermediate',
    summary: 'F-Droid is the premiere open-source Android app repository. Submission is completely free and F-Droid automatically builds your app from your public Git repo.',
    prerequisites: [
      'Public GitHub or GitLab repository',
      'Open Source License (MIT, Apache 2.0, GPL, BSD, etc.)',
      'No proprietary analytics/tracking SDKs (or properly tagged in metadata)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Ensure your app complies with Anti-Features criteria',
        description: 'F-Droid values privacy. Make sure you do not bundle mandatory proprietary SDKs (like closed Google Play Services). Open source alternatives like MicroG or unified push can be used.',
        tip: 'If your app has opt-in ads or non-free network services, disclose them in the build recipe metadata.'
      },
      {
        stepNumber: 2,
        title: 'Create a Metadata YAML Build Recipe',
        description: 'Create a metadata YAML file corresponding to your application ID (e.g. com.example.myapp.yml).',
        codeLanguage: 'yaml',
        codeSnippet: `Categories:
  - Utility
  - Productivity
License: MIT
AuthorName: Your Name
SourceCode: https://github.com/yourusername/myapp
IssueTracker: https://github.com/yourusername/myapp/issues
Website: https://myapp.example.com

AutoName: My Free App
Summary: Clean productivity utility for Android
Description: |-
  A fast, lightweight, and 100% free Android application with zero ads
  and full offline functionality.

RepoType: git
Repo: https://github.com/yourusername/myapp.git

Builds:
  - versionName: 1.0.0
    versionCode: 1
    commit: v1.0.0
    subdir: app
    gradle:
      - yes

AutoUpdateMode: Version
UpdateCheckMode: Tags`,
        tip: 'F-Droid uses this recipe to check for new release tags on your GitHub repo and automatically trigger automated builds!'
      },
      {
        stepNumber: 3,
        title: 'Submit Merge Request to fdroiddata Repository',
        description: 'Fork the official https://gitlab.com/fdroid/fdroiddata repo, add your com.example.myapp.yml file into the metadata folder, and submit a Merge Request.',
        codeLanguage: 'bash',
        codeSnippet: `# Clone your fork of fdroiddata:
git clone https://gitlab.com/yourusername/fdroiddata.git
cd fdroiddata

# Add your metadata file:
cp /path/to/com.example.myapp.yml metadata/

# Commit & push:
git add metadata/com.example.myapp.yml
git commit -m "Add com.example.myapp"
git push origin master`,
        tip: 'Once approved by F-Droid maintainers, your app will automatically be indexed and available to millions of F-Droid app users!'
      }
    ]
  },
  {
    id: 'guide-amazon',
    title: 'Publishing to Amazon Appstore ($0 Developer Account)',
    category: 'store',
    timeEstimate: '15 Mins',
    difficulty: 'Beginner',
    summary: 'Amazon Appstore offers $0 registration fees and allows you to instantly reach Fire Tablet, Fire TV, and millions of Android smartphone users.',
    prerequisites: [
      'Signed Release APK or AAB file',
      'App Screenshots (1280x720 or 1920x1080 PNG/JPG)',
      'App Icon (512x512 PNG)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create a Free Amazon Developer Account',
        description: 'Visit https://developer.amazon.com/apps-and-games and sign in with your standard Amazon account or register a free corporate/individual developer profile ($0 fee required).',
        tip: 'Amazon developer accounts take less than 2 minutes to set up and do NOT require a credit card or identity fee.'
      },
      {
        stepNumber: 2,
        title: 'Start a New App Submission',
        description: 'In the Amazon Developer Console dashboard, click "Add New App" -> "Android". Enter your App Title, App Category (Games, Utilities, Lifestyle, etc.), and support contact details.'
      },
      {
        stepNumber: 3,
        title: 'Upload Binary APK & Store Assets',
        description: 'Upload your signed app-release.apk, set your content rating, upload 3+ screenshots, set your description, and select pricing ($0 Free or Paid).',
        tip: 'Amazon automatically tests your binary against Fire OS and general Android devices within 24 hours.'
      },
      {
        stepNumber: 4,
        title: 'Submit for Review',
        description: 'Click Submit. Review usually completes within 24-48 hours. Once published, your app is live on Amazon Appstore globally!'
      }
    ]
  },
  {
    id: 'guide-github-releases',
    title: 'Direct Self-Hosting with GitHub Releases + Auto-Updates',
    category: 'self-host',
    timeEstimate: '15 Mins',
    difficulty: 'Intermediate',
    summary: 'Host your release APKs on GitHub CDN for $0 and implement a lightweight 15-line update check in Android so users are automatically prompted when new updates arrive.',
    prerequisites: [
      'GitHub Repository for your app',
      'Signed Release APK'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Publish a Release on GitHub',
        description: 'Go to your GitHub repository -> Releases -> "Draft a new release". Create a tag like v1.0.0, attach your app-release.apk file, and click Publish Release.',
        tip: 'GitHub provides direct permanent download URLs like: https://github.com/USER/REPO/releases/latest/download/app-release.apk'
      },
      {
        stepNumber: 2,
        title: 'Add Kotlin In-App Auto Update Checker',
        description: 'Paste this clean 20-line check into your MainActivity or Splash screen to notify users when a newer release exists on GitHub API.',
        codeLanguage: 'kotlin',
        codeSnippet: `// Simple GitHub Auto-Update Check in Kotlin
import kotlinx.coroutines.*
import org.json.JSONObject
import java.net.URL

fun checkAppUpdate(currentVersionCode: Int, onUpdateAvailable: (latestVersion: String, downloadUrl: String) -> Unit) {
    CoroutineScope(Dispatchers.IO).launch {
        try {
            val apiResponse = URL("https://api.github.com/repos/YOUR_GITHUB_USER/YOUR_REPO/releases/latest").readText()
            val json = JSONObject(apiResponse)
            val latestTagName = json.getString("tag_name") // e.g. "v1.1.0"
            val assets = json.getJSONArray("assets")
            
            if (assets.length() > 0) {
                val apkDownloadUrl = assets.getJSONObject(0).getString("browser_download_url")
                
                // Compare tags or version string
                if (latestTagName != "v1.0.0") { // Replace with actual current versionName
                    withContext(Dispatchers.Main) {
                        onUpdateAvailable(latestTagName, apkDownloadUrl)
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}`,
        tip: 'When onUpdateAvailable fires, show an alert dialog with a "Download & Install Update" button that opens the downloadUrl in the system browser!'
      }
    ]
  },
  {
    id: 'guide-pwa',
    title: 'Deploying as a Progressive Web App (PWA)',
    category: 'pwa',
    timeEstimate: '10 Mins',
    difficulty: 'Beginner',
    summary: 'Turn your React/HTML5 web application into an installable Android app that runs fullscreen, works offline, and bypasses native app store submission completely.',
    prerequisites: [
      'Web application hosted on HTTPS (Vercel, Netlify, GitHub Pages)',
      '512x512 PNG app icon'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create public/manifest.json',
        description: 'Define your app name, theme color, display mode, and icons.',
        codeLanguage: 'json',
        codeSnippet: `{
  "short_name": "MyApp",
  "name": "My Free Android App",
  "icons": [
    {
      "src": "/icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/",
  "background_color": "#0f172a",
  "theme_color": "#6366f1",
  "display": "standalone",
  "orientation": "portrait"
}`,
        tip: 'Setting display to "standalone" removes the browser navigation bar so the PWA looks and feels identical to a native Android app!'
      },
      {
        stepNumber: 2,
        title: 'Register Service Worker in index.html or main.js',
        description: 'Enable offline caching and instant loading.',
        codeLanguage: 'javascript',
        codeSnippet: `if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('PWA ServiceWorker registered:', reg.scope))
      .catch(err => console.error('ServiceWorker registration failed:', err));
  });
}`,
        tip: 'Users visiting your URL on Chrome for Android will automatically see an "Add to Home Screen" or "Install App" banner!'
      }
    ]
  },
  {
    id: 'guide-direct-landing',
    title: 'Creating a Direct APK Download Landing Page',
    category: 'self-host',
    timeEstimate: '5 Mins',
    difficulty: 'Beginner',
    summary: 'Build a high-converting download landing page that guides Android users through downloading the APK and enabling "Allow from unknown sources".',
    prerequisites: [
      'Direct APK link (hosted on GitHub Releases, Cloudflare R2, or AWS S3)',
      'Basic app metadata and screenshots'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Use our interactive Landing Page Generator tool',
        description: 'Navigate to the "Landing Page Generator" tab in this app to customize your app name, version, screenshots, feature list, and download URL.'
      },
      {
        stepNumber: 2,
        title: 'Include Visual Android Sideloading Instructions',
        description: 'When users tap Download APK on Android 8.0+ to Android 14+, Android will ask "Allow Chrome to install apps from this source?". Your page should clearly show the 2 simple toggles required to approve.',
        tip: 'Step 1: Tap Download. Step 2: Open downloaded APK. Step 3: Tap Settings -> Enable "Allow from this source" -> Tap Install.'
      }
    ]
  }
];
