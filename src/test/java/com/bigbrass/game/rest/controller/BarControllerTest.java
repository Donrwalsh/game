package com.bigbrass.game.rest.controller;

import com.bigbrass.game.rest.mediation.BarsMediation;
import com.bigbrass.game.rest.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(BarControllerTest.class)
@ContextConfiguration(classes={BarController.class})
public class BarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BarsMediation barsMediation;

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            System.out.println(jsonContent);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testBars() throws Exception {
        when(barsMediation.resolveAuto(8675309)).thenReturn(5);

        RequestBuilder request = MockMvcRequestBuilders
                .get("/bars/8675309")
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(model().size(1))
                .andExpect(model().attribute("autoCompletions", 5))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void testBeginBar() throws Exception {
        Bar bar = new Bar(2, 1, 60, false, 0);
        RequestPojo requestPojo = new RequestPojo(1, 2);

        Progress progress = new Progress(bar);

        when(barsMediation.startProgressBar(any())).thenReturn(progress);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/bars/begin")
                .content(asJsonString(requestPojo))
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json("{\"id\":null,\"userId\":2,\"barId\":1,\"startTime\":\""
                        + progress.getStartTime().toString() + "\",\"endTime\":\""
                        + progress.getEndTime().toString() + "\"}"))
                .andReturn();
    }

    @Test
    public void testCompleteBar() throws Exception {
        RequestPojo requestPojo = new RequestPojo(1, 43);
        Completion completion = new Completion(43);

        when(barsMediation.completeProgressBar(any())).thenReturn(completion);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/bars/complete")
                .content(asJsonString(requestPojo))
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\":null,\"userId\":43,\"count\":0}"))
                .andReturn();
    }

    @Test
    public void testCompletions() throws Exception {
        Completion completion = new Completion(9);

        when(barsMediation.getCompletions(9)).thenReturn(completion);

        RequestBuilder request = MockMvcRequestBuilders
                .get("/bars/completions?userId=9")
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\":null,\"userId\":9,\"count\":0}"))
                .andReturn();
    }

    @Test
    public void testInitBars() throws Exception {
        Bar bar1 = new Bar(8, 1, 10, false, 0);
        Bar bar2 = new Bar(8, 2, 60, false, 0);
        Bar bar3 = new Bar(8, 3, 3600, false, 0);
        Progress progress = new Progress(bar1);

        when(barsMediation.generateInit(8)).thenReturn(new Init(Arrays.asList(progress), Arrays.asList(bar1, bar2, bar3)));

        RequestBuilder request = MockMvcRequestBuilders
                .get("/bars/init?userId=8")
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"progresses\":[{\"id\":null,\"userId\":8,\"barId\":1,\"startTime\":\""
                        + progress.getStartTime().toString() + "\",\"endTime\":\""
                        + progress.getEndTime().toString() + "\"}],\"bars\":["
                        + "{\"id\":null,\"userId\":8,\"barNum\":1,\"durationSec\":10,\"auto\":false,\"autoCount\":0},"
                        + "{\"id\":null,\"userId\":8,\"barNum\":2,\"durationSec\":60,\"auto\":false,\"autoCount\":0},"
                        + "{\"id\":null,\"userId\":8,\"barNum\":3,\"durationSec\":3600,\"auto\":false,\"autoCount\":0}"
                        + "]}"))
                .andReturn();
    }

    @Test
    public void testSubmit() throws Exception {
        Bar bar1 = new Bar(8, 1, 10, false, 0);
        Bar bar2 = new Bar(8, 2, 60, false, 0);
        Bar bar3 = new Bar(8, 3, 3600, false, 0);
        List<Bar> barDetails = Arrays.asList(bar1, bar2, bar3);

        when(barsMediation.saveBars(any())).thenReturn(barDetails);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/bars/submit")
                .content(asJsonString(barDetails))
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json("["
                    + "{\"id\":null,\"userId\":8,\"barNum\":1,\"durationSec\":10,\"auto\":false,\"autoCount\":0},"
                    + "{\"id\":null,\"userId\":8,\"barNum\":2,\"durationSec\":60,\"auto\":false,\"autoCount\":0},"
                    + "{\"id\":null,\"userId\":8,\"barNum\":3,\"durationSec\":3600,\"auto\":false,\"autoCount\":0}]"))
                .andReturn();



    }
}
