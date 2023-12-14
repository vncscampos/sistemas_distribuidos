package com.example;

import java.util.Random;

public class Producer extends Thread {
    private String name;
    private Buffer buffer;

    String[] news = {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Pellentesque ac justo vel lorem fermentum sagittis.",
            "Duis vehicula felis id libero tincidunt, non mattis nulla fringilla.",
            "Vivamus euismod dolor vitae risus tristique, vel tincidunt nisl tristique.",
            "Proin feugiat justo ac tortor scelerisque facilisis.",
            "Sed euismod elit eget diam ultricies, vel aliquam sapien efficitur.",
            "Fusce nec elit eu neque venenatis finibus.",
            "Curabitur ultricies leo vel sapien pellentesque, vel fermentum odio tincidunt.",
            "Integer cursus justo vel justo congue, eu posuere nunc ultricies.",
            "Vestibulum sagittis justo vel metus tincidunt, ac eleifend turpis sollicitudin."
    };

    public Producer(String name, Buffer buffer) {
        this.name = name;
        this.buffer = buffer;
        start();
    }

    public void run() {
        Random random = new Random();

        while(true) {
            int index = random.nextInt(news.length);
            String item = this.news[index];

            buffer.produceNews(item + "- Produzido por: " + this.name);
            System.out.println(this.name + " produziu: " + item);

            try {
                int sleepTime = random.nextInt(3000);
                sleep(sleepTime);
            } catch (InterruptedException e) {
            }
        }
    }
}
