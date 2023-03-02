import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  function callOneDriveApi(accessToken) {
    var url = 'https://graph.microsoft.com/v1.0/me/drive/root/assets/images'; // get the root folder children

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response)) // display the folder items
      .catch((error) => console.log(error));
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <button
          onClick={() => {
            // vai retornar um code na url que deve ser usado no getToken
            var clientId = '60dbf259-3e7b-41d1-98c1-da0df9addca7';
            var redirectUri =
              'https://thunderous-marshmallow-dec0d2.netlify.app/';
            var scopes = 'files.readwrite offline_access'; // add more scopes as needed
            var url =
              'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' +
              clientId +
              '&scope=' +
              scopes +
              '&response_type=code&redirect_uri=' +
              redirectUri;
            window.location.href = url; // redirect the user to the login page
          }}
        >
          Logar
        </button>

        <button
          onClick={() => {
            var code = new URLSearchParams(window.location.search).get('code');

            var clientId = '60dbf259-3e7b-41d1-98c1-da0df9addca7';
            var clientSecret = '8Lr8Q~ruGkwRzQhxCErBIvdELlSqBv3UaevV.dqo'; // only needed for web apps
            var redirectUri =
              'https://thunderous-marshmallow-dec0d2.netlify.app/';
            var url =
              'https://login.microsoftonline.com/common/oauth2/v2.0/token';
            var data = {
              client_id: clientId,
              client_secret: clientSecret, // only needed for web apps
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: redirectUri,
            };

            fetch(url, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${code}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
              },
              body: new URLSearchParams(data),
            })
              .then((response) => response.json())
              .then((response) => {
                console.log(response)
                // store the access token and refresh token in local storage or cookie
                console.log(`access_token: ${response.access_token}`);
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                localStorage.setItem('expires_in', response.expires_in);

                // call OneDrive API with the access token
                callOneDriveApi(response.access_token);
              })
              .catch((error) => console.log(error));
          }}
        >
          Pegar token
        </button>

        <img src="https://dsm04pap003files.storage.live.com/y4m-7oAj5J82KRE04MYmt0KXVATqn8a6AaRaJac-67mG4fh1oM8lTmobnKCHc1b3wzNrP91ewP5qnVUntq5MjzG9Q0DEpkjebASwQkPZKPmTF-s8wDFpmDrcVjxBWlepyxgtRfg4FnG8hPVmGQ7bajHNnrBKUg86qkBa-VX3_Yj7h8eUEBFStKswBnD1cEmI7Vd?width=300&height=181&cropmode=none" />
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://next.new" target="_blank" rel="noopener noreferrer">
          Created with&nbsp;<b>next.new</b>&nbsp;⚡️
        </a>
      </footer>
    </div>
  );
}
