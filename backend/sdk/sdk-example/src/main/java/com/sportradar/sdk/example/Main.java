package com.sportradar.sdk.example;

import com.sportradar.sdk.common.exceptions.SdkException;
import com.sportradar.sdk.feed.common.entities.EventIdentifier;
import com.sportradar.sdk.feed.livescout.interfaces.LiveScoutFeed;
import com.sportradar.sdk.feed.livescout.interfaces.LiveScoutFeedListener;
import com.sportradar.sdk.feed.sdk.Sdk;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {

    private final static Logger logger = LoggerFactory.getLogger(Main.class);

    /**
     * The main entry point for the sdk-example
     *
     * @param args provided command line arguments
     */
    public static void main(String[] args) throws SdkException {

        logger.info("Starting application");

        final Sdk sdk = Sdk.getInstance();
        final LiveScoutFeed liveScoutFeed = sdk.getLiveScout();

        final LiveScoutFeedListener scoutFeedListener = new LiveScoutFeedListenerImpl();

        if (liveScoutFeed != null) {
            liveScoutFeed.open(scoutFeedListener);
        }

        try {
            boolean close = false;
            while(!close && liveScoutFeed != null) {
                liveScoutFeed.subscribeToTest(EventIdentifier.id(35848015L), 100, 0);
            }
        } catch (Exception e) {
            logger.error("Error: ", e);
        }

        sdk.close();
    }
}