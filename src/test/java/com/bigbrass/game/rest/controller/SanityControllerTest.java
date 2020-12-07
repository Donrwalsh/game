package com.bigbrass.game.rest.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@WebMvcTest(SanityController.class)
@ContextConfiguration(classes={SanityController.class})
public class SanityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void sanityCheck_basic() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/sanity-check")
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(request).andReturn();

        assertEquals("Hello World", result.getResponse().getContentAsString());
    }
}
