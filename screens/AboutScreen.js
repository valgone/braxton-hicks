import React from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';


const AboutScreen = () => {

  // Abrir link da fonte.
  const handlePressLink = () => {
    Linking.openURL('https://www.ncbi.nlm.nih.gov/books/NBK470546/').catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Como usar o aplicativo</Text>
        <Text style={styles.text}>
        No início de uma contração, pressione o botão "Início". Ao final da contração, pressione "Fim". 
        Logo após, selecione uma opção de intensidade para atribuir ao registro. Será registrado uma contração contendo:
        </Text>
        <Text style={styles.listItem}>- Duração da contração.</Text>
        <Text style={styles.listItem}>- A data e hora em que foi iniciada.</Text>
        <Text style={styles.listItem}>- A intensidade.</Text>
        <Text style={styles.text}>
        A aplicação também irá exibir a média da duração das contrações e média da frequência.
        </Text>
        <Text style={styles.text}>
        Registre 3 ou mais contrações e o aplicativo verificará se as contrações podem indicar o início do parto.
        </Text>
        <Text style={styles.text}>Para apagar uma contração, pressione e aguarde até que a mensagem de confirmação apareça.</Text>
        <Text style={styles.text}>Para apagar todo histórico pressione o icone da lixeira em vermelho.</Text>
    
        <Text style={styles.sectionTitle}>Diferença entre Contrações Falsas e Reais</Text>
        <Text style={styles.sectionTitle}>Contrações Falsas (Braxton Hicks):</Text>
        <Text style={styles.listItem}>- Irregulares em intensidade.</Text>
        <Text style={styles.listItem}>- Geralmente não são dolorosas.</Text>
        <Text style={styles.listItem}>- Não aumentam em frequência.</Text>
        <Text style={styles.listItem}>- Frequentemente param com uma mudança de atividade ou posição.</Text>
        <Text style={styles.sectionTitle}>Contrações Reais (Trabalho de Parto):</Text>
        <Text style={styles.listItem}>- Regulares em intensidade.</Text>
        <Text style={styles.listItem}>- Aumentam em frequência e intensidade.</Text>
        <Text style={styles.listItem}>- Geralmente dolorosas.</Text>
        <Text style={styles.listItem}>- Não param com uma mudança de atividade ou posição.</Text>

        <Text style={styles.sectionTitle}>Em casos de contrações que você identifique:</Text>
        <Text style={styles.listItem}>- Sangramento vaginal</Text>
        <Text style={styles.listItem}>- Vazamento de líquido pela vagina</Text>
        <Text style={styles.listItem}>- Contrações fortes a cada 5 minutos durante uma hora</Text>
        <Text style={styles.listItem}>- Contrações que a mulher não consegue "caminhar durante"</Text>
        <Text style={styles.listItem}>- Uma mudança notável no movimento fetal, ou se houver menos de dez movimentos a cada 2 horas.</Text>
        <Text style={styles.sectionTitle}>Contate seu plano de saúde ou médico responsável</Text>

        <Text style={styles.listItem}>Fonte:</Text>
        <TouchableOpacity onPress={handlePressLink}>
          <Text style={[styles.listItem, styles.link]}>Biblioteca Nacional de Medicina dos Estados Unidos</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AboutScreen;
