# auth-web-apps
Aprendendo sobre autenticação em web apps com vídeo (Passport.js, Node, Express)

Acessar o banco de dados
nome: rm551669
senha: rfMMseZSRGOWKvmO

IP address (177.45.70.140)

O que é Passport JS?
Middleware do Express
Em cada requisição HTTP, Passport ira usar a "estratégia" para determinar se o requisitor tem permissão para ver o recurso.
Se o usuário não tiver permissão, será jogado um erro 401 não autorizado

Estratégias do Passport?
Cada estratégia usa o framework Passport JS como templete
A estratégia local do Passport utiliza Cookies, sessões Express e alguma lógica de autenticação

strategy = middleware 

"Passport.js é um middleware de autenticação para Node.js que utiliza um sistema de strategies (estratégias). As strategies não são exatamente middlewares, mas módulos que definem como a autenticação será feita (por exemplo, via JWT, Google OAuth, Facebook, etc). Podemos usar strategies já existentes ou criar nossas próprias estratégias personalizadas para trabalhar com o Passport.js."

O protocolo HTTP é um protocolo sem estado em outras palavras vai esquecer constantemente o que o usuário fez no site, a menos que tenhamos uma maneira de lembrar isso, 

1. "HTTP é um protocolo sem estado" – o que isso significa?
"Sem estado" (stateless) significa que cada requisição HTTP é independente. O servidor não guarda informações sobre o que aconteceu antes. Ou seja, ele não se lembra de requisições anteriores feitas pelo mesmo usuário.

2. Consequência disso:
Se você visitar uma página e depois clicar em um botão para fazer login, o servidor não vai automaticamente saber que foi você quem visitou a página anterior. Ele só vê a nova requisição, sem contexto.
Se você não tiver os cookies ao fazer um refresh da página você terá que fazer o log in novamente 


3. Como contornar isso?
É um armazenamento persistente
Para que o servidor "lembre" quem é o usuário entre as requisições, usamos mecanismos como:
    Cookies: armazenam um identificador no navegador do usuário.
    Sessões: armazenam dados no servidor associados ao identificador do cookie.
    Tokens (como JWTs): enviados junto com as requisições para autenticar o usuário.
    LocalStorage / SessionStorage: para guardar dados no lado do cliente (browser).


então em outras palavras se formos ao Google

O express-session é um middleware para o framework Node.js Express que serve para gerenciar sessões de usuários em aplicações web. Ele permite que você armazene informações específicas do usuário entre diferentes requisições HTTP, como se fosse uma "memória" temporária do servidor para cada usuário conectado.
📌 Principais funcionalidades do express-session:

    Identificação de usuário entre requisições
    Cada usuário que acessa sua aplicação recebe um ID de sessão único, geralmente salvo em um cookie no navegador.

    Armazenamento temporário de dados
    Você pode guardar dados como:

        Nome do usuário logado

        Itens de um carrinho de compras

        Preferências de interface

        Flags de autenticação (ex: req.session.loggedIn = true)

    Autenticação
    É muito utilizado em sistemas de login, onde você precisa lembrar que um usuário se autenticou.

💡 Como funciona?

Quando um cliente faz uma requisição:

    O middleware cria (ou recupera) uma sessão no servidor.

    Um cookie de sessão (por padrão, chamado connect.sid) é enviado ao cliente.

    Em requisições futuras, esse cookie é usado para recuperar os dados da sessão do servidor.

Sessão: é um conjunto de dados temporários que o servidor armazena para identificar e lembrar informações sobre um usuário enquanto ele navega por um site.

os cookies de identificação são um ID da sessão.

De forma geral a difenreça entre cookie e uma sessão do express é o local em que os dados são armazenados

A sessão express irá armazenar tipo de dados um pouco maior, então em um cookie você não consegue colocar muitos dados e fica muito tedioso se estivermos adicionando constantemente mais e mais dados para  o cookie que estamos anexando a cada solicitação, então faria colocar em umsa sessão do lado do servidor onde podemos armazenar quantidades maiores de dados, além disso, uma sessão do lado do servidor é vantajoso porque com um cookie nós não podemos armazenar qualquer tipo de credencial de usuário ou informações secretas, se o fizessemos um hackear conseguiria facilmente as informações e roubar dados pessoais, o benefício de uma sessão é basicamente o fato de que temos em nosso lado do servidor e estamos realmente autenticando a sessão com uma chave secreta.

1. Cookies armazenam poucos dados
-Cookies são pequenos pedaços de dados que o navegador armazena e envia em cada requisição  HTTP ao servidor.

-O tamanho de um cookie geralmente é limitado a cerca de 4KB, ou seja, não da pra guardar muitas informações.

-Se tentar guardar muitos dados em cookies, isso rapidamente fica ineficiente e problemático.

2.Cookies crescentes são tediosos e ineficientes
-Cada vez que o navegador faz uma requisição( por exemplo, para acessar uma nova página), todos os cookies são enviados junto.

-Se eles estiverem muito grandes, isso deixa a aplicação mais lenta e gasta mais largura de banda desnecessariamente.

3.Sessões armazenam dados no servidor
-Uma sessão no Express(usando express-session) armazena os dados no servidor, não no navegador.

-O navegador apenas guarda um cookie com o ID da sessão(geralmente algo como connect.sid)

-O servidor usa esse ID para recuperar os dados completos da sessão armazenados em memória, em um banco de dados ou em Redis.

4. Segurança: cookies não devem conter dados sensíveis
-Como o conteúdo do cookie está no navegador do usuário, ele pode ser interceptado ou manipulado.

-Se você armazenar senhas, tokens ou dados sensíveis em cookies, isso pode levar a roubo de identidade ou invasões.

-Nunca armazene dados sensíveis diretamente em cookies.

5. Sessões são mais seguras(com chave secreta)
-Sessões usam uma chave secreta para assinar e proteger o cookie de sessão

-Mesmo que alguém intercepte o cookie, ele não pode ser alterado sem invalidar a assinatura

-Além disso como os dados da sessão estão no servidor o cliente (navegador) não tem acesso direto a eles, o que melhora muito a segurança.

Session Store(Armazenamento de Sessão)
É basicamente decidir que memória persistente nós vamos armazenar nossas sessões

Quando usamos sessões em um backend com express-session (ou outro framework), estamos lidando com dados temporários que representam um usuário conectado — como o carrinho de compras, dados de login, permissões, etc.

Essas sessões precisam ser armazenadas em algum lugar para persistirem entre requisições.

Esse "lugar" é chamado de Session Store (ou armazenamento de sessão).


Session Store é onde o servidor guarda os dados da sessão do usuário.
Em produção, você deve usar um armazenamento externo e persistente, como Redis ou MongoDB, para garantir performance, segurança e escalabilidade.

O que pode ser usado como Session Store?

Podemos usar diferentes tipos de memória para armazenar essas sessões:
1. Memória RAM (padrão)

    Quando você não configura nada, o express-session usa a memória do próprio servidor.

    Boa para testes e desenvolvimento.

    Desvantagem: os dados são apagados se o servidor reiniciar. E não funciona bem se você tiver vários servidores (escala horizontal).

2. Armazenamentos persistentes (recomendado para produção)
🔹 Redis (mais comum)

    Banco de dados na memória, super rápido.

    Ideal para sessões porque:

        Armazena dados temporários.

        É extremamente rápido.

        Pode ser usado por múltiplos servidores ao mesmo tempo.

3. MongoDB

    Usado quando você já está usando MongoDB no seu app.

    Usa a biblioteca connect-mongo.

 Outros exemplos:

    MySQL (com express-mysql-session)

    PostgreSQL

    Arquivo no disco (raro, lento)

    Memcached