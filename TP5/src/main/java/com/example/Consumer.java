package com.example;

import java.util.Random;

public class Consumer extends Thread {
    private String name;
    private Buffer buffer;

    public Consumer(String name, Buffer buffer) {
        this.name = name;
        this.buffer = buffer;
        start();
    }

    public void run() {
        Random random = new Random();

        while(true) {
            
            String news = buffer.consumeNews();
            System.out.println(this.name + " consumiu: " + news);

            try {
                int sleepTime = random.nextInt(3000);
                sleep(sleepTime);
            } catch (InterruptedException e) {
            }
        }
    }
}

