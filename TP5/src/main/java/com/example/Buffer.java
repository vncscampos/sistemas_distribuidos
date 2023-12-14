package com.example;

import java.util.ArrayList;
import java.util.Random;

public class Buffer {
    private int maxSize;
    private ArrayList<String> news = new ArrayList<>();

    public Buffer(int size) {
        this.maxSize = size;
    }

    public synchronized void produceNews(String news) {
        if (this.maxSize == this.news.size()) {
            goToSleep(); // produtor dorme
        }

        this.news.add(news);

        if (this.news.size() == 1)
            notify(); // se consumidor estava dormindo, acorde
    }

    public synchronized String consumeNews() {
        if (this.news.size() == 0) {
            goToSleep(); // consumidor dorme
        }

        Random random = new Random();
        int index = random.nextInt(this.news.size());

        if (this.news.size() == this.maxSize - 1)
            notify(); // se produtor estava dormindo, acorde

        return this.news.remove(index);
    }

    public int getBufferSize() {
        return this.news.size();
    }

    private void goToSleep() {
        try {
            wait();
        } catch (InterruptedException e) {
        }
    }
}
