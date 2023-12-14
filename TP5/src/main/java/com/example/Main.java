package com.example;

public class Main {
    public static void main(String[] args) {
        Buffer buffer = new Buffer(10);

        int nProducer = 10;
        int nConsumer = 1;

        for (int i = 0; i < nProducer; i++) {
            Producer prod = new Producer("Producer " + i, buffer);
        }

        for (int i = 0; i < nConsumer; i++) {
            Consumer cons = new Consumer("Consumer " + i, buffer);
        }
    }
}