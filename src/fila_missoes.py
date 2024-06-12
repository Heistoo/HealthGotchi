class Missao:
    #Construtor
    def __init__(self, id, descricao, pontos, criterio_numero,criterio_tipo):
        self.id = id
        self.descricao = descricao
        self.pontos = pontos
        self.progresso = 0
        self.criterio_numero = criterio_numero
        self.criterio_tipo = criterio_tipo
    #toString
    def __repr__(self):
        return f"Missao(id={self.id}, descricao={self.descricao}, pontos={self.pontos}, progresso={self.progresso})"
    
    def get_criterio_numero(self):
        return self.criterio_numero
    
    def get_criterio_tipo(self):
        return self.criterio_tipo
    
    def get_progresso(self):
        return self.progresso

class FilaMissoes:
    #Construtor da Fila
    def __init__(self, missoes):
        self.fila = missoes
        self.posicao_usuario = 1  # Inicia na primeira missão
        self.usuario_id = 0 #Apenas o inicializa
    
    def set_usuario_id(self, usuario_id):
        self.usuario_id = usuario_id

    def proxima_missao(self):
        if (self.posicao_usuario+1) % len(self.fila) != 0:
            self.posicao_usuario += 1
        else:
            self.posicao_usuario = 0
        self.fila[self.posicao_usuario].progresso = 0  # Reinicia o progresso
        return f"Número da próxima missão: {self.posicao_usuario + 1}"

    #Não sei se é preciso
    def avancar_missao(self):
        if self.posicao_usuario < len(self.fila) - 1:
            self.posicao_usuario += 1
            return f"Usuário avançou para a missão {self.posicao_usuario + 1}."
        else:
            return "Usuário já está na última missão."
    
    #Mostra a posição da fila
    def posicao_atual(self):
        if self.fila:
            return self.posicao_usuario
        else:
            return "A fila de missões está vazia."
        
    #Retorna a missão atual
    def missao_atual(self, index):
        if self.fila:
            missao = self.fila[index]
            return {
                "descricao": missao.descricao,
                "progresso": missao.progresso
            }
        else:
            return "A fila de missões está vazia."
    
    def aumentar_progresso(self, index):
        self.fila[index-1].progresso += 1
