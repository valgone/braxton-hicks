import React from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Sobre o Aplicativo</Text>
        <Text style={styles.sectionTitle}>Contrações de Braxton Hicks</Text>
        <Text style={styles.text}>
          As contrações de Braxton Hicks, também conhecidas como "falsas contrações" ou "falso trabalho de parto", são contrações uterinas que podem ocorrer durante a gravidez. Elas são a forma do corpo se preparar para o trabalho de parto real, mas não indicam que o trabalho de parto começou. Essas contrações são geralmente irregulares e não se tornam mais frequentes com o tempo.
        </Text>
        <Text style={styles.sectionTitle}>Diferença entre Contrações Falsas e Reais</Text>
        <Text style={styles.text}>Contrações Falsas (Braxton Hicks):</Text>
        <Text style={styles.listItem}>- Irregulares em intensidade.</Text>
        <Text style={styles.listItem}>- Geralmente não são dolorosas.</Text>
        <Text style={styles.listItem}>- Não aumentam em frequência.</Text>
        <Text style={styles.listItem}>- Frequentemente param com uma mudança de atividade ou posição.</Text>
        <Text style={styles.text}>Contrações Reais (Trabalho de Parto):</Text>
        <Text style={styles.listItem}>- Regulares em intensidade.</Text>
        <Text style={styles.listItem}>- Aumentam em frequência e intensidade.</Text>
        <Text style={styles.listItem}>- Geralmente dolorosas.</Text>
        <Text style={styles.listItem}>- Não param com uma mudança de atividade ou posição.</Text>
        <Text style={styles.sectionTitle}>Recomendações para Gestantes</Text>
        <Text style={styles.text}>
          Se você experimentar contrações, aqui estão algumas dicas para ajudar a gerenciá-las:
        </Text>
        <Text style={styles.listItem}>- Beba bastante água para se manter hidratada.</Text>
        <Text style={styles.listItem}>- Mude sua atividade ou posição para ver se as contrações param.</Text>
        <Text style={styles.listItem}>- Descanse e relaxe o máximo possível.</Text>
        <Text style={styles.listItem}>- Acompanhe suas contrações e entre em contato com seu profissional de saúde se perceber um padrão ou se elas se tornarem mais intensas.</Text>
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
});

export default AboutScreen;
