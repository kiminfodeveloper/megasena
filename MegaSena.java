import java.util.Scanner;

public class MegaSena {

	static int NUMERO_DEZENAS = 6;

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		int[] sorteio = sorteaSena();
		int[] aposta = new int[NUMERO_DEZENAS];

		// processamento da aposta
		System.out.println("Faça sua aposta, o valor é de R$1,00 cada número: ");
		for (int i = 0; i < NUMERO_DEZENAS; i++) {
			int numeroAposta;
			boolean repetido = false;

			do {
				System.out.println("Informe a dezena " + (i + 1) + ": ");
				numeroAposta = sc.nextInt();
				if (numeroAposta <= 0) {
					System.out.println("Número inválido, aposta canvelada!");
					return;
				}
				repetido = existeNumero(aposta, numeroAposta);
				if (repetido) {
					System.out.println("Ops, número repetido!");
				}

			} while (repetido); // faz com que evite a repetição de números

			aposta[i] = numeroAposta;
		}

		System.out.println("Confira sua aposta: ");
		for (int i = 0; i < aposta.length; i++) {
			System.out.println(aposta[i] + " ");
		}

		int numeroAcertos = contaAcertos(sorteio, aposta);
		System.out.println("Número de acertos: " + numeroAcertos);

		switch (numeroAcertos) {
		case 4:
			System.out.println("Parabéns. Você acertou a quadra! Sua premiação é R$ 250 mil");
			break;
		case 5:
			System.out.println("Parabéns. Você acertou a quina! Sua premiação é R$ 750 mil");
			break;
		case 6:
			System.out.println("Parabéns. Você é campeão da MegaSena! Seu prêmio é R$ 55 milhões !");
			break;
		default:
			System.out.println("Não foi dessa vez. Tente novamente!");
			break;
		}

	}

	// está função utliza uma api do java retornando valores randomicos

	static int[] sorteaSena() {
		int[] resultado = new int[NUMERO_DEZENAS];
		for (int i = 0; i < NUMERO_DEZENAS; i++) {
			int sorteado;
			boolean repetido = false;

			do {
				sorteado = (int) (Math.random() * 60) + 1; // numero randomico de 1 a 60
				repetido = existeNumero(resultado, sorteado);
			} while (repetido); // evita o numero se repetir

			resultado[i] = sorteado;

		}
		return resultado;
	}

	// está função compara os numeros apostados com os sorteados

	static int contaAcertos(int[] sorteio, int[] aposta) {
		int acertos = 0;
		for (int i = 0; i < NUMERO_DEZENAS; i++) {
			int numeroAposta = aposta[i];

			// compara os nmr da aposta com o sorteado
			if (existeNumero(sorteio, numeroAposta)) {
				acertos++;
			}
		}
		return acertos;
	}

	// array numero verificação

	static boolean existeNumero(int[] numeros, int n) {
		for (int i = 0; i < numeros.length; i++) {
			if (numeros[i] == n) {
				return true;
			}
		}
		return false;
	}

}