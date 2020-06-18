Rotas da aplicação:
Rotas de usuário:
  - Criação de usuário -> post:url/users
  Body{
    "name": "John Smith",
    "email" : "john@mail.com",
    "password" : "123",
    "nickname" : "jSmith"
  }

  - Criação de sessão -> post:url/session
  Body{
    "email" : "john@mail.com",
    "password" : "123"
  }

  - Adicionar pontos -> patch:url/users/points
  Body{
    "points": "12"
  },
  Header -> Token JWT

  - Troca de avatar -> patch:url/users/avatar
  body -> Multipart form -> {
    avatar : "image"
  }
  Header -> Token JWT

  - Obtenção do ranking -> get:url/users/raking

Rotas de Rimas:
  - Criar rimas -> post:url/rymes
  Body{
	"syllable": "ma"
  }
  Header -> Token JWT

Rotas de Palavras:
  - Criar palavras -> post:url/words
  Body{
    "term": "lhama",
    "rhyme_id": "e4bbdd0d-766a-429d-95f7-0ec8cee0b23a"
  }
  Header -> Token JWT

  - Troca de Imagem da palavra -> patch:url/words/image/:wordid
  body -> Multipart form -> {
    image : "image"
  }
  Header -> Token JWT, wordId


Rotas de jogos :
  - Gerar partida de rimas -> get:url/game/rhyme
  Body{
	"numberOfRhymes" : 2,
	"numberOfWords" : 2
  }
  Sendo "numberOfWords" o número de palavras por rima.
