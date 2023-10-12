package com.p2pchat;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.Socket;

import org.json.JSONObject;

public class Main {

    public void updateListenToPeers(BufferedReader bufferedReader, String username, ServerThread serverThread)
            throws Exception {
        System.out.println("-> digite hostname:port (pressione enter)");
        System.out.println("-> peers já podem receber as mensagens (pressione s para pular):");
        String input = bufferedReader.readLine();
        String[] inputValues = input.split(" ");

        if (!input.equals("s")) {
            for (int i = 0; i < inputValues.length; i++) {
                String[] addr = inputValues[i].split(":");
                Socket socket = null;

                try {
                    socket = new Socket(addr[0], Integer.valueOf(addr[1]));
                    new PeerThread(socket).start();
                } catch (Exception e) {
                    if (socket != null)
                        socket.close();
                    else
                        System.out.println("Entrada inválida. Avançando para a próxima etapa.");
                }
            }
        }
        communicate(bufferedReader, username, serverThread);
    }

    public void communicate(BufferedReader bufferedReader, String username, ServerThread serverThread)
            throws Exception {
        try {
            System.out.println("> Você pode agora comunicar (digite 'e' para sair, 'c' para mudar)");
            boolean flag = true;
            while (flag) {
                String message = bufferedReader.readLine();
                if (message.equals("e")) {
                    flag = false;
                    break;
                } else if (message.equals("c")) {
                    updateListenToPeers(bufferedReader, username, serverThread);
                } else {
                    JSONObject jsonMessage = new JSONObject();
                    jsonMessage.put("username", username);
                    jsonMessage.put("message", message);

                    String jsonString = jsonMessage.toString();

                    serverThread.sendMessage(jsonString);
                }
            }
            System.exit(0);
        } catch (Exception e) {
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        System.out.println("Digite o nome e a porta: ");
        String[] setupValues = bufferedReader.readLine().split(" ");
        ServerThread serverThread = new ServerThread(setupValues[1]);
        serverThread.start();
        new Main().updateListenToPeers(bufferedReader, setupValues[0], serverThread);
    }
}