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

import java.util.Arrays;

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
        Progress progress = new Progress(8, 1);
        when(progressService.findByUserId(8)).thenReturn(Arrays.asList(progress));
        System.out.println(progress);

        RequestBuilder request = MockMvcRequestBuilders
                .get("/bars?userId=8")
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":null,\"userId\":8,\"barId\":1,\"startTime\":\""
                        + progress.getStartTime().toString() + "\",\"endTime\":\""
                        + progress.getEndTime().toString() + "\"}]"))
                .andReturn();
    }
}
