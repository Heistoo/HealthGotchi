class Missao:
    #Construtor
    def __init__(self, id, descricao, pontos):
        self.id = id
        self.descricao = descricao
        self.pontos = pontos
    #toString
    def __repr__(self):
        return f"Missao(id={self.id}, descricao={self.descricao}, pontos={self.pontos})"

class FilaMissoes:
    #Construtor da Fila
    def __init__(self):
        self.fila = []
        self.posicao_usuario = 0  # Inicia na primeira missão

    def proxima_missao(self):
        if self.posicao_usuario < len(self.fila):
            missao = self.fila[self.posicao_usuario]
            return f"Próxima missão: {missao.descricao}"
        else:
            return "Não há mais missões na fila."

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
    def missao_atual(self):
        if self.missoes:
            missao = self.missoes[self.posicao_usuario]
            return f"Missão atual: {missao.descricao}"
        else:
            return "A fila de missões está vazia."
