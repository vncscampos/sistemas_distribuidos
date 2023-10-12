package com.p2pchat;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

import org.json.JSONException;
import org.json.JSONObject;

public class PeerThread extends Thread {
    private BufferedReader bufferedReader;

    public PeerThread(Socket socket) throws IOException {
        bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    }

    public void run() {
        boolean flag = true;
        while (flag) {
            try {
                JSONObject jsonObject = new JSONObject(bufferedReader.readLine());
                if (jsonObject.has("username")) {
                    String username = jsonObject.getString("username");
                    String message = jsonObject.getString("message");
                    System.out.println("[" + username + "]: " + message);
                }
            } catch (IOException e) {
                flag = false;
                interrupt();
            } catch (JSONException e) {
                flag = false;
                interrupt();
            }
        }
    }
}
