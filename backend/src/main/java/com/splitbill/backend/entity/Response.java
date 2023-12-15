package com.splitbill.backend.entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Response {

    private  String name;
    private String jwtToken;
}
