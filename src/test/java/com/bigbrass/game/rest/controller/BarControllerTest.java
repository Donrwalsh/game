package com.bigbrass.game.rest.controller;

import com.bigbrass.game.rest.model.Progress;
import com.bigbrass.game.rest.service.CompletionService;
import com.bigbrass.game.rest.service.ProgressService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(BarControllerTest.class)
@ContextConfiguration(classes={BarController.class})
public class BarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompletionService completionService;

    @MockBean
    private ProgressService progressService;

    @Test
    public void getBars() throws Exception {

        Progress progress = new Progress(1);
        List progressList = new ArrayList<>();
        progressList.add(progress);

        when(progressService.findByUserId(1)).thenReturn(progressList);

        RequestBuilder request = MockMvcRequestBuilders
                .get("/bars")
                .accept(MediaType.APPLICATION_JSON);

        // toString() removes trailing zeros.
        DateTimeFormatter desiredFormatter
                = DateTimeFormatter.ofPattern("uuuu-MM-dd'T'HH:mm:ss.SSS");

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":null,\"userId\":1,\"barId\":1,\"startTime\":\""
                        + progress.getStartTime().format(desiredFormatter) + "\",\"endTime\":\""
                        + progress.getEndTime().format(desiredFormatter) + "\"}]"))
                .andReturn();
    }
}
