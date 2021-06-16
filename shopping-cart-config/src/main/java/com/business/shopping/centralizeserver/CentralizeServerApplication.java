package com.business.shopping.centralizeserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
@SpringBootApplication
public class CentralizeServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CentralizeServerApplication.class, args);
	}

}
